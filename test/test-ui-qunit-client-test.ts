import * as Q from '@test-ui/qunit';

QUnit.module('test-ui-qunit-client tests');

QUnit.test('Exports are correct', assert => {
  assert.equal(Q.QUnitTestClient, 'QUnitTestClient exists');
  assert.equal(Q.QUnitTestServer, 'QUnitTestServer exists');
});
