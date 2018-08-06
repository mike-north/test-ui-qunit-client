import {
  Client,
  ConnectionClient,
  IFrameConnectionClient
} from '@test-ui/core';

// tslint:disable-next-line:no-namespace
namespace QUnitTestClient {
  export interface Options extends Client.Options {}
}

class QUnitTestClient extends Client {
  constructor(opts: QUnitTestClient.Options) {
    super(opts);
    this.log.purple.pushPrefix('QUnit');
  }
  async setupConnection(conn: ConnectionClient) {
    const c = conn as any;
    if (typeof c.queryParams !== 'undefined') {
      const iframeConn: IFrameConnectionClient = conn as any;
      iframeConn.queryParams.devmode = true;
    }
  }
  // tslint:disable-next-line:no-empty
  protected async prepareServerFrame() {}
}
export default QUnitTestClient;
