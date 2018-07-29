import { config } from '@test-ui/core';

const isEmberTesting = () => !!(window !== void 0 && (window as any).Ember !== void 0 && (window as any).Ember.testing !== void 0);
const isQunitGlobalFound = () => !!(window !== void 0 && (window as any).QUnit !== void 0);
export function setupTestIndicators() {
  config.testFrameIndicators.push(isEmberTesting, isQunitGlobalFound);
}
