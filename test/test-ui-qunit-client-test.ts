import hello from 'test-ui-qunit-client';

QUnit.module('test-ui-qunit-client tests');

QUnit.test('hello', assert => {
  assert.equal(hello(), 'Hello from test-ui-qunit-client');
});
