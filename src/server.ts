import { TestServer, TestServerMethods as BaseServerMethods } from '@test-ui/core';
import { Locator, QUnitModuleDetails, getAllModuleData } from 'qunit-metadata';
import './index';

export interface StartQUnitTestOptions {
  filter: {
    module: Locator<QUnitModuleDetails>;
  };
}

export interface ServerMethods extends BaseServerMethods {
  startTests(opts?: StartQUnitTestOptions): void;
}

export default class QUnitTestServer extends TestServer<ServerMethods> {
  constructor(private QUnit: QUnit) {
    super();
  }
  protected async setupMethods(): Promise<ServerMethods> {
    const { QUnit } = this;
    return {
      startTests(opts?: StartQUnitTestOptions) {
        let moduleIds: string[] | null = null;
        if (opts && opts.filter && opts.filter.module) {
          moduleIds = getAllModuleData(opts.filter.module).map(m => m.moduleId);
        }
        if (moduleIds) {
          console.log('moduleIds', moduleIds);
        }
        QUnit.start();
      }
    };
  }
}
