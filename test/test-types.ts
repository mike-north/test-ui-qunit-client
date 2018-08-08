import IFrameClientConnection from '../node_modules/@test-ui/core/dist/types/src/connection/iframe-client';
import { QUnitTestClient } from './index';

const clientOpts: QUnitTestClient.Options = {
  enabled: true,
  connection: new IFrameClientConnection({
    frame: window.document.createElement('iframe'),
    baseUrl: '/tests'
  })
};
