import { setupTestIndicators } from './config';

function setup() {
  setupTestIndicators();
}
setup();

export { default as Server, ServerMethods } from './server';
