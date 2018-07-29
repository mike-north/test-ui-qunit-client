import { TestServer, TestServerMethods } from '@test-ui/core';
import './index';

export interface QUnitIsh {
  start(): void;
}

export default class QUnitTestServer extends TestServer {
  constructor(private QUnit: QUnitIsh) {
    super();
    console.log('setting up qunit server');
  }
  protected async setupMethods(): Promise<TestServerMethods> {
    const { QUnit } = this;
    this.readyDeferred.resolve();
    return {
      startTests() {
        QUnit.start();
      }
    };
  }

}
