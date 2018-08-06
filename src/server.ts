import { Server, State, StateReference, TestModule } from '@test-ui/core';
import { PredicateObject } from 'object-predicate';
import { getAllModuleData } from 'qunit-metadata';
import YouAreI from 'youarei';
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

function serializableQunitModules(qUnit: QUnit): any[] {
  return (qUnit.config as any).modules.map((m: any) => ({
    ...m,
    ...{ hooks: null }
  }));
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

function getSelectedTestIds(
  qUnit: QUnit,
  moduleFilter: PredicateObject<TestModule>
) {
  const mods = getAllModuleData(moduleFilter, { QUnit: qUnit });
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
    if (!moduleFilter) {
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
    this.qUnit.done(details => {
      conn.sendTestData({
        event: 'done',
        details,
        suites: serializableQunitModules(this.qUnit)
      });
    });
    this.qUnit.begin(details => {
      conn.sendTestData({
        event: 'begin',
        details,
        suites: serializableQunitModules(this.qUnit)
      });
    });
    this.qUnit.moduleStart(details => {
      conn.sendTestData({
        event: 'moduleStart',
        details,
        suites: serializableQunitModules(this.qUnit)
      });
    });
    this.qUnit.moduleDone(details => {
      conn.sendTestData({
        event: 'moduleDone',
        details,
        suites: serializableQunitModules(this.qUnit)
      });
    });
    this.qUnit.testStart(details => {
      conn.sendTestData({
        event: 'testStart',
        details,
        suites: serializableQunitModules(this.qUnit)
      });
    });
    this.qUnit.testDone(details => {
      conn.sendTestData({
        event: 'testDone',
        details,
        suites: serializableQunitModules(this.qUnit)
      });
    });
  }
}
export default QUnitTestServer;
