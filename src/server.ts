import {
  Server,
  State,
  StateReference,
  SuiteInfo,
  SuitePredicate
} from '@test-ui/core';
import { PredicateObject, toPredicate } from 'object-predicate';
import { QUnitModuleDetails, getAllModuleData } from 'qunit-metadata';
import YouAreI from 'youarei';
import {
  normalizeRunEndEvent,
  normalizeRunStartEvent,
  normalizeSuiteEndEvent,
  normalizeSuiteStartEvent,
  normalizeTestEndEvent,
  normalizeTestStartEvent
} from './normalize';
// tslint:disable-next-line:no-namespace
namespace QUnitTestServer {
  export interface Options extends Server.Options {}
}

function arrayEq(a: string[], b: string[]) {
  const aa = [...a].sort();
  const bb = [...b].sort();
  for (let i = 0; i < a.length; i++) {
    if (aa[i] !== bb[i]) {
      console.debug('mismatch', aa[i], bb[i]);
      return false;
    }
  }
  return true;
}

function shouldReloadFrame(moduleTestIds: string[]): false | string {
  const configTestId: string | string[] | undefined = QUnit.config.testId;
  if (
    !(
      typeof configTestId === 'object' &&
      typeof configTestId.forEach === 'function'
    )
  ) {
    return 'configTestId was not an array';
  }
  if (configTestId.length !== moduleTestIds.length) {
    return (
      'configTestId length (' +
      configTestId.length +
      ') did not match moduleTestIds.length (' +
      moduleTestIds.length +
      ')'
    );
  } else if (!arrayEq(configTestId, moduleTestIds)) {
    return `Current state [${configTestId.join(
      ', '
    )}] did not match target state [${moduleTestIds.join(', ')}]`;
  } else return false;
}

function qUnitModuleToSuiteInfo(qm: Partial<QUnitModuleDetails>): SuiteInfo {
  const result: SuiteInfo = {
    name: '',
    id: '',
    fullName: [],
    tests: [],
    testCounts: {
      total: 0
    }
  };
  const { suiteReport, moduleId } = qm;
  if (typeof suiteReport !== 'undefined') {
    result.id = '' + moduleId;
    result.name = suiteReport.name;
    result.fullName = suiteReport.fullName;
  }
  return result;
}

function getSelectedTestIds(qUnit: QUnit, moduleFilter: SuitePredicate) {
  const mods = getAllModuleData(
    qmod => {
      const p: (s: SuiteInfo) => boolean = (typeof moduleFilter === 'function'
        ? moduleFilter
        : toPredicate(moduleFilter)) as any;
      const pp: (m: Partial<QUnitModuleDetails>) => boolean = m => {
        return p(qUnitModuleToSuiteInfo(qmod));
      };
      return pp(qmod);
    },
    {
      QUnit: qUnit
    }
  );
  const moduleTests = mods
    .map(m => m.tests)
    .reduce((testarr, modTests) => testarr.concat(modTests), []);
  return moduleTests.map(t => t.testId);
}

function saveState(state: State) {
  window.sessionStorage.setItem('@test-ui/qunit:request-id', state.id);
}

function loadState(): Partial<StateReference> {
  let id = window.sessionStorage.getItem('@test-ui/qunit:request-id');
  window.sessionStorage.removeItem('@test-ui/qunit:request-id');
  if (id !== null) return { id };
  else return {};
}

function redirectToUrlForTests(moduleTestIds: string[], state: State) {
  const newUrl = new YouAreI(window.location.href).query_merge({
    testId: moduleTestIds
  });
  saveState(state);
  window.location.href = newUrl.to_string();
}

class QUnitTestServer extends Server {
  constructor(public qUnit: QUnit, opts: QUnitTestServer.Options) {
    super(opts);
    this.log.purple.pushPrefix('QUnit');
    this.log.debug('constructor');
  }
  async boot(): Promise<StateReference | undefined> {
    const stateRef = loadState();
    const { id } = stateRef;
    if (typeof id === 'undefined') return;
    return { id };
  }

  async prepareEnvironment(state: State): Promise<{ ready: boolean }> {
    this.log.white.bgDeepSkyBlue.pushPrefix('prepareImpl');
    this.log.debug('begin');
    const { data: moduleFilter } = state;
    if (typeof moduleFilter === 'undefined') {
      // There is no filter, run all tests
      this.runAllTests();
      return { ready: true }; // GO
    } else {
      // There is a filter. Figure out which test IDs we should run
      const moduleTestIds = getSelectedTestIds(this.qUnit, moduleFilter);
      this.log.debug('test ids: ', moduleTestIds);
      // Figure out if we should reload the frame.
      const reloadReason = shouldReloadFrame(moduleTestIds);
      if (typeof reloadReason === 'string') {
        // If we should reload, log the issue
        this.log.debug('Reloading because \'' + reloadReason + '\'');
        // ... and then reload with the correct queryParams
        redirectToUrlForTests(moduleTestIds, state);
        this.log.popPrefix();
        return { ready: false }; // Indicate that we shouldn't proceed any further
      } else {
        // Tests we want to run match the filter. Let's run!
        this.log.debug('frame is fine');
        this.log.popPrefix();
        return { ready: true }; // GO
      }
    }
  }
  async runTests() {
    this.log.debug('running tests for qunit');
    this.setupEventListeners();
    this.qUnit.start();
  }

  private runAllTests() {
    this.log.debug('No filter. Starting tests');
    this.log.popPrefix();
  }
  /**
   * Setup QUnit event listeners such that they call ServerConnection#sendTestData
   */
  private async setupEventListeners() {
    const conn = this.conn;
    let assertionCache: {
      [k: string]: { [k: string]: QUnit.LogDetails[] };
    } = {};
    this.qUnit.done(details => {
      conn.sendTestData(
        normalizeRunEndEvent(this.qUnit, details, assertionCache)
      );
    });
    this.qUnit.begin(details => {
      assertionCache = {}; // reset
      conn.sendTestData(normalizeRunStartEvent(this.qUnit, details));
    });
    this.qUnit.moduleStart(details => {
      assertionCache[details.name] = {}; // set up assertion cache for module
      conn.sendTestData(normalizeSuiteStartEvent(this.qUnit, details));
    });
    this.qUnit.moduleDone(details => {
      conn.sendTestData(
        normalizeSuiteEndEvent(
          this.qUnit,
          details,
          assertionCache[details.name]
        )
      );
    });
    this.qUnit.testStart(details => {
      assertionCache[details.module][details.name] = []; // set up assertion cache for test
      conn.sendTestData(normalizeTestStartEvent(this.qUnit, details));
    });
    this.qUnit.testDone(details => {
      conn.sendTestData(
        normalizeTestEndEvent(
          this.qUnit,
          details,
          assertionCache[details.module][details.name]
        )
      );
    });
    this.qUnit.log(details => {
      assertionCache[details.module][details.name].push(details);
    });
  }
}
export default QUnitTestServer;
