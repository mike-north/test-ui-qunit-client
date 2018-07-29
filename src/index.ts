import { setupTestIndicators } from './config';

function setup() {
  console.log('setting up qunit');
  setupTestIndicators();
}
setup();

export { default as Server } from './server';
