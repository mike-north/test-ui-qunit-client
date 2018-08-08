import * as Q from '@test-ui/qunit';

QUnit.module('test-ui-qunit-client tests');

QUnit.test('Exports are correct', assert => {
  assert.ok(Q.QUnitTestClient, 'QUnitTestClient exists');
  assert.ok(Q.QUnitTestServer, 'QUnitTestServer exists');
});

QUnit.module('Foo', _hooks => {
  QUnit.test('bar', assert => {
    assert.ok(true, 'baz');
  });
});
