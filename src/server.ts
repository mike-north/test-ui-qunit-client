import { TestServer, TestServerMethods as BaseServerMethods } from '@test-ui/core';
import { Locator, QUnitModuleDetails, getAllModuleData } from 'qunit-metadata';
import './index';
import patch from './qunit-patch';
import isEmber from './is-ember';

export interface StartQUnitTestOptions {
  filter: {
    module: Locator<QUnitModuleDetails>;
  };
}

export interface ServerMethods extends BaseServerMethods {
  startTests(opts?: StartQUnitTestOptions): void;
}

export default class QUnitTestServer extends TestServer<ServerMethods> {
  constructor(private q: QUnit) {
    super();
    patch(q);
  }

  protected async setupMethods(): Promise<ServerMethods> {
    const { q } = this;
    return {
      startTests(opts?: StartQUnitTestOptions) {
        if (isEmber) {
          const require = (window as any).require;
          require('ember-qunit').start({ startTests: false});
        }
        let mods: QUnitModuleDetails[] = [];
        if (opts && opts.filter && opts.filter.module) {
          mods = getAllModuleData(opts.filter.module);
        }
        if (mods && mods.length > 0) {
          const testIds = mods
            .map(m => m.tests)
            .reduce((tlist, mtlist) => tlist.concat(mtlist[0]), [])
            .map(t => t.testId);
          QUnit.config.testId = testIds;
          console.log('testIds', testIds);
        }
        q.start();
      }
    };
  }
}
