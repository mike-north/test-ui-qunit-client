import { TestServer, TestServerMethods as BaseServerMethods } from '@test-ui/core';
import { Locator, QUnitModuleDetails, getAllModuleData } from 'qunit-metadata';
import './index';
import patch from './qunit-patch';

export interface StartQUnitTestOptions {
  filter: {
    module: Locator<QUnitModuleDetails>;
  };
}
export interface GetTestsForFilterQUnitTestOptions {
  filter: {
    module: Locator<QUnitModuleDetails>;
  };
}

export interface ServerMethods extends BaseServerMethods {
  getTestsForFilter(opts?: GetTestsForFilterQUnitTestOptions): string[];
  startTests(opts?: StartQUnitTestOptions): void;
}

export default class QUnitTestServer extends TestServer<ServerMethods> {
  constructor(private q: QUnit) {
    super();
    patch(q);
  }

  protected async setupMethods(): Promise<ServerMethods> {
    const { q } = this;
    const log = this.log.bind(this);
    return {
      getTestsForFilter(opts?: GetTestsForFilterQUnitTestOptions) {
        let mods: QUnitModuleDetails[] = [];
        if (opts && opts.filter && opts.filter.module) {
          mods = getAllModuleData(opts.filter.module);
        }
        let testIds: string[] = [];
        if (mods && mods.length > 0) {
          testIds = mods
            .map(m => m.tests)
            .reduce((tlist, mtlist) => tlist.concat(mtlist[0]), [])
            .map(t => t.testId);
          log('testIds', testIds);
        }
        return testIds;
      },
      startTests(_opts?: StartQUnitTestOptions) {
        q.start();
      }
    };
  }
}
