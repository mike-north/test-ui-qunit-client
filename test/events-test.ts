import { suite, test } from 'qunit-decorators';
import {
  normalizeRunEndEvent,
  normalizeRunStartEvent,
  normalizeSuiteEndEvent,
  normalizeSuiteStartEvent,
  normalizeTestEndEvent,
  normalizeTestStartEvent
} from '../src/normalize';
import { qunitConfigOnly } from './mock-qunit';

const wildCardAssertions = new Proxy(
  {},
  {
    get(target, prop) {
      return [];
    }
  }
);
const wildCardAssertions2x = new Proxy(
  {},
  {
    get(target, prop) {
      return wildCardAssertions;
    }
  }
);

@suite
export class EventDataTest {
  @test
  foo(assert: Assert) {
    assert.ok(true, 'it works');
  }
  @test
  'QUnit begin event can be converted into a runStart js-runners event'(
    assert: Assert
  ) {
    const beginEvent: QUnit.BeginDetails = {
      totalTests: 5
    };
    const converted = normalizeRunStartEvent(qunitConfigOnly, beginEvent);
    assert.ok(converted);
    assert.deepEqual(converted, {
      event: 'runStart',
      data: {
        fullName: [],
        tests: [],
        childSuites: [
          {
            name: 'Foo',
            fullName: ['Foo'],
            childSuites: [],
            tests: [
              {
                id: '972bbdda/bar',
                name: 'bar',
                fullName: ['Foo', 'bar'],
                suiteName: '972bbdda'
              }
            ],
            testCounts: { total: 1 }
          },
          {
            name: 'EventDataTest',
            fullName: ['EventDataTest'],
            childSuites: [],
            tests: [
              {
                id: '5880552a/foo',
                name: 'foo',
                fullName: ['EventDataTest', 'foo'],
                suiteName: '5880552a'
              },
              {
                id:
                  '5880552a/QUnit begin event can be converted into a runStart js-runners event',
                name:
                  'QUnit begin event can be converted into a runStart js-runners event',
                fullName: [
                  'EventDataTest',
                  'QUnit begin event can be converted into a runStart js-runners event'
                ],
                suiteName: '5880552a'
              },
              {
                id:
                  '5880552a/QUnit moduleStart event can be converted into a suiteStart js-runners event',
                name:
                  'QUnit moduleStart event can be converted into a suiteStart js-runners event',
                fullName: [
                  'EventDataTest',
                  'QUnit moduleStart event can be converted into a suiteStart js-runners event'
                ],
                suiteName: '5880552a'
              },
              {
                id:
                  '5880552a/QUnit moduleDone event can be converted into a suiteEnd js-runners event',
                name:
                  'QUnit moduleDone event can be converted into a suiteEnd js-runners event',
                fullName: [
                  'EventDataTest',
                  'QUnit moduleDone event can be converted into a suiteEnd js-runners event'
                ],
                suiteName: '5880552a'
              },
              {
                id:
                  '5880552a/QUnit testStart event can be converted into a testStart js-runners event',
                name:
                  'QUnit testStart event can be converted into a testStart js-runners event',
                fullName: [
                  'EventDataTest',
                  'QUnit testStart event can be converted into a testStart js-runners event'
                ],
                suiteName: '5880552a'
              },
              {
                id:
                  '5880552a/QUnit testDone event can be converted into a testEnd js-runners event',
                name:
                  'QUnit testDone event can be converted into a testEnd js-runners event',
                fullName: [
                  'EventDataTest',
                  'QUnit testDone event can be converted into a testEnd js-runners event'
                ],
                suiteName: '5880552a'
              },
              {
                id:
                  '5880552a/QUnit done event can be converted into a runEnd js-runners event',
                name:
                  'QUnit done event can be converted into a runEnd js-runners event',
                fullName: [
                  'EventDataTest',
                  'QUnit done event can be converted into a runEnd js-runners event'
                ],
                suiteName: '5880552a'
              }
            ],
            testCounts: { total: 7 }
          },
          {
            name: 'test-ui-qunit-client tests',
            fullName: ['test-ui-qunit-client tests'],
            childSuites: [],
            tests: [
              {
                id: '04c201f6/Exports are correct',
                name: 'Exports are correct',
                fullName: ['test-ui-qunit-client tests', 'Exports are correct'],
                suiteName: '04c201f6'
              }
            ],
            testCounts: { total: 1 }
          },
          {
            name: 'Foo',
            fullName: ['Foo'],
            childSuites: [],
            tests: [
              {
                id: '972bbdda/bar',
                name: 'bar',
                fullName: ['Foo', 'bar'],
                suiteName: '972bbdda'
              }
            ],
            testCounts: { total: 1 }
          }
        ],
        testCounts: { total: 10 }
      }
    });
  }
  @test
  'QUnit moduleStart event can be converted into a suiteStart js-runners event'(
    assert: Assert
  ) {
    const moduleStart: QUnit.ModuleStartDetails = {
      name: 'Foo'
    };
    const converted = normalizeSuiteStartEvent(qunitConfigOnly, moduleStart);
    assert.ok(converted);
    assert.deepEqual(converted, {
      event: 'suiteStart',
      data: {
        name: 'Foo',
        fullName: ['Foo'],
        childSuites: [],
        tests: [
          {
            id: '972bbdda/bar',
            name: 'bar',
            fullName: ['Foo', 'bar'],
            suiteName: '972bbdda'
          }
        ],
        testCounts: { total: 1 }
      }
    });
  }
  @test
  'QUnit moduleDone event can be converted into a suiteEnd js-runners event'(
    assert: Assert
  ) {
    const moduleDone: QUnit.ModuleDoneDetails = {
      name: 'Foo',
      failed: 2,
      passed: 10,
      total: 12,
      runtime: 400
    };
    const converted = normalizeSuiteEndEvent(qunitConfigOnly, moduleDone, {
      bar: [
        {
          module: 'Foo',
          name: 'bar',
          expected: 31,
          actual: 33,
          runtime: 38,
          result: false,
          source: '',
          message: 'sadface'
        }
      ]
    });
    assert.ok(converted);
    assert.deepEqual(converted, {
      event: 'suiteEnd',
      data: {
        name: 'root',
        fullName: ['root'],
        childSuites: [
          {
            name: 'Foo',
            fullName: ['Foo'],
            childSuites: [],
            tests: [
              {
                id: 'Foo/bar',
                name: 'bar',
                fullName: ['Foo', 'bar'],
                suiteName: 'Foo'
              }
            ],
            testCounts: { total: 1 }
          }
        ],
        status: 'passed',
        runtime: 3,
        tests: [
          {
            id: '972bbdda/bar',
            name: 'bar',
            fullName: ['Foo', 'bar'],
            suiteName: '972bbdda',
            status: 'failed',
            runtime: 2,
            errors: [
              {
                message: 'sadface',
                passed: false,
                expected: 31,
                actual: 33,
                todo: false
              }
            ],
            assertions: [
              {
                message: 'sadface',
                passed: false,
                expected: 31,
                actual: 33,
                todo: false
              }
            ]
          }
        ],
        testCounts: { total: 1, passed: 0, skipped: 0, todo: 0, failed: 1 }
      }
    });
  }
  @test
  'QUnit testStart event can be converted into a testStart js-runners event'(
    assert: Assert
  ) {
    const moduleStart: QUnit.TestStartDetails = {
      module: 'Foo',
      name: 'bar'
    };
    const converted = normalizeTestStartEvent(qunitConfigOnly, moduleStart);
    assert.ok(converted);
    assert.deepEqual(converted, {
      event: 'testStart',
      data: {
        id: 'Foo/bar',
        name: 'bar',
        fullName: ['Foo', 'bar'],
        suiteName: 'Foo'
      }
    });
  }
  @test
  'QUnit testDone event can be converted into a testEnd js-runners event'(
    assert: Assert
  ) {
    const moduleDone: QUnit.TestDoneDetails = {
      module: 'Foo',
      name: 'bar',
      failed: 2,
      passed: 10,
      total: 12,
      runtime: 300
    };
    const converted = normalizeTestEndEvent(qunitConfigOnly, moduleDone, [
      {
        module: 'Foo',
        name: 'bar',
        expected: 31,
        actual: 33,
        runtime: 38,
        result: false,
        source: '',
        message: 'sadface'
      }
    ]);
    assert.ok(converted);
    assert.deepEqual(converted, {
      data: {
        assertions: [
          {
            actual: 33,
            expected: 31,
            message: 'sadface',
            passed: false,
            todo: false
          }
        ],
        errors: [
          {
            actual: 33,
            expected: 31,
            message: 'sadface',
            passed: false,
            todo: false
          }
        ],
        fullName: ['Foo', 'bar'],
        id: 'Foo/bar',
        name: 'bar',
        runtime: 2,
        status: 'failed',
        suiteName: 'Foo'
      },
      event: 'testEnd'
    });
  }
  @test
  'QUnit done event can be converted into a runEnd js-runners event'(
    assert: Assert
  ) {
    const doneEvent: QUnit.DoneDetails = {
      failed: 5,
      passed: 5,
      total: 10,
      runtime: 500
    };
    const converted = normalizeRunEndEvent(
      qunitConfigOnly,
      doneEvent,
      wildCardAssertions2x
    );
    assert.ok(converted);
    assert.deepEqual(converted, {
      event: 'runEnd',
      data: {
        status: 'passed',
        fullName: [],
        runtime: 8,
        tests: [],
        childSuites: [
          {
            name: 'root',
            fullName: ['root'],
            childSuites: [
              {
                name: 'Foo',
                fullName: ['Foo'],
                childSuites: [],
                tests: [
                  {
                    id: 'Foo/bar',
                    name: 'bar',
                    fullName: ['Foo', 'bar'],
                    suiteName: 'Foo'
                  }
                ],
                testCounts: { total: 1 }
              }
            ],
            status: 'passed',
            runtime: 3,
            tests: [
              {
                id: '972bbdda/bar',
                name: 'bar',
                fullName: ['Foo', 'bar'],
                suiteName: '972bbdda',
                status: 'passed',
                runtime: 2,
                errors: [],
                assertions: []
              }
            ],
            testCounts: { total: 1, passed: 1, skipped: 0, todo: 0, failed: 0 }
          },
          {
            name: 'root',
            fullName: ['root'],
            childSuites: [
              {
                name: 'EventDataTest',
                fullName: ['EventDataTest'],
                childSuites: [],
                tests: [
                  {
                    id: 'EventDataTest/foo',
                    name: 'foo',
                    fullName: ['EventDataTest', 'foo'],
                    suiteName: 'EventDataTest'
                  },
                  {
                    id:
                      'EventDataTest/QUnit begin event can be converted into a runStart js-runners event',
                    name:
                      'QUnit begin event can be converted into a runStart js-runners event',
                    fullName: [
                      'EventDataTest',
                      'QUnit begin event can be converted into a runStart js-runners event'
                    ],
                    suiteName: 'EventDataTest'
                  },
                  {
                    id:
                      'EventDataTest/QUnit moduleStart event can be converted into a suiteStart js-runners event',
                    name:
                      'QUnit moduleStart event can be converted into a suiteStart js-runners event',
                    fullName: [
                      'EventDataTest',
                      'QUnit moduleStart event can be converted into a suiteStart js-runners event'
                    ],
                    suiteName: 'EventDataTest'
                  },
                  {
                    id:
                      'EventDataTest/QUnit moduleDone event can be converted into a suiteEnd js-runners event',
                    name:
                      'QUnit moduleDone event can be converted into a suiteEnd js-runners event',
                    fullName: [
                      'EventDataTest',
                      'QUnit moduleDone event can be converted into a suiteEnd js-runners event'
                    ],
                    suiteName: 'EventDataTest'
                  },
                  {
                    id:
                      'EventDataTest/QUnit testStart event can be converted into a testStart js-runners event',
                    name:
                      'QUnit testStart event can be converted into a testStart js-runners event',
                    fullName: [
                      'EventDataTest',
                      'QUnit testStart event can be converted into a testStart js-runners event'
                    ],
                    suiteName: 'EventDataTest'
                  },
                  {
                    id:
                      'EventDataTest/QUnit testDone event can be converted into a testEnd js-runners event',
                    name:
                      'QUnit testDone event can be converted into a testEnd js-runners event',
                    fullName: [
                      'EventDataTest',
                      'QUnit testDone event can be converted into a testEnd js-runners event'
                    ],
                    suiteName: 'EventDataTest'
                  },
                  {
                    id:
                      'EventDataTest/QUnit done event can be converted into a runEnd js-runners event',
                    name:
                      'QUnit done event can be converted into a runEnd js-runners event',
                    fullName: [
                      'EventDataTest',
                      'QUnit done event can be converted into a runEnd js-runners event'
                    ],
                    suiteName: 'EventDataTest'
                  }
                ],
                testCounts: { total: 7 }
              }
            ],
            status: 'passed',
            runtime: 4,
            tests: [
              {
                id: '5880552a/foo',
                name: 'foo',
                fullName: ['EventDataTest', 'foo'],
                suiteName: '5880552a',
                status: 'passed',
                runtime: 0,
                errors: [],
                assertions: []
              },
              {
                id:
                  '5880552a/QUnit begin event can be converted into a runStart js-runners event',
                name:
                  'QUnit begin event can be converted into a runStart js-runners event',
                fullName: [
                  'EventDataTest',
                  'QUnit begin event can be converted into a runStart js-runners event'
                ],
                suiteName: '5880552a',
                status: 'passed',
                runtime: 0,
                errors: [],
                assertions: []
              },
              {
                id:
                  '5880552a/QUnit moduleStart event can be converted into a suiteStart js-runners event',
                name:
                  'QUnit moduleStart event can be converted into a suiteStart js-runners event',
                fullName: [
                  'EventDataTest',
                  'QUnit moduleStart event can be converted into a suiteStart js-runners event'
                ],
                suiteName: '5880552a',
                status: 'passed',
                runtime: 0,
                errors: [],
                assertions: []
              },
              {
                id:
                  '5880552a/QUnit moduleDone event can be converted into a suiteEnd js-runners event',
                name:
                  'QUnit moduleDone event can be converted into a suiteEnd js-runners event',
                fullName: [
                  'EventDataTest',
                  'QUnit moduleDone event can be converted into a suiteEnd js-runners event'
                ],
                suiteName: '5880552a',
                status: 'passed',
                runtime: 1,
                errors: [],
                assertions: []
              },
              {
                id:
                  '5880552a/QUnit testStart event can be converted into a testStart js-runners event',
                name:
                  'QUnit testStart event can be converted into a testStart js-runners event',
                fullName: [
                  'EventDataTest',
                  'QUnit testStart event can be converted into a testStart js-runners event'
                ],
                suiteName: '5880552a',
                status: 'passed',
                runtime: 0,
                errors: [],
                assertions: []
              },
              {
                id:
                  '5880552a/QUnit testDone event can be converted into a testEnd js-runners event',
                name:
                  'QUnit testDone event can be converted into a testEnd js-runners event',
                fullName: [
                  'EventDataTest',
                  'QUnit testDone event can be converted into a testEnd js-runners event'
                ],
                suiteName: '5880552a',
                status: 'passed',
                runtime: 0,
                errors: [],
                assertions: []
              },
              {
                id:
                  '5880552a/QUnit done event can be converted into a runEnd js-runners event',
                name:
                  'QUnit done event can be converted into a runEnd js-runners event',
                fullName: [
                  'EventDataTest',
                  'QUnit done event can be converted into a runEnd js-runners event'
                ],
                suiteName: '5880552a',
                status: 'passed',
                runtime: 1,
                errors: [],
                assertions: []
              }
            ],
            testCounts: { total: 7, passed: 7, skipped: 0, todo: 0, failed: 0 }
          },
          {
            name: 'root',
            fullName: ['root'],
            childSuites: [
              {
                name: 'test-ui-qunit-client tests',
                fullName: ['test-ui-qunit-client tests'],
                childSuites: [],
                tests: [
                  {
                    id: 'test-ui-qunit-client tests/Exports are correct',
                    name: 'Exports are correct',
                    fullName: [
                      'test-ui-qunit-client tests',
                      'Exports are correct'
                    ],
                    suiteName: 'test-ui-qunit-client tests'
                  }
                ],
                testCounts: { total: 1 }
              }
            ],
            status: 'passed',
            runtime: 1,
            tests: [
              {
                id: '04c201f6/Exports are correct',
                name: 'Exports are correct',
                fullName: ['test-ui-qunit-client tests', 'Exports are correct'],
                suiteName: '04c201f6',
                status: 'passed',
                runtime: 1,
                errors: [],
                assertions: []
              }
            ],
            testCounts: { total: 1, passed: 1, skipped: 0, todo: 0, failed: 0 }
          },
          {
            name: 'root',
            fullName: ['root'],
            childSuites: [
              {
                name: 'Foo',
                fullName: ['Foo'],
                childSuites: [],
                tests: [
                  {
                    id: 'Foo/bar',
                    name: 'bar',
                    fullName: ['Foo', 'bar'],
                    suiteName: 'Foo'
                  }
                ],
                testCounts: { total: 1 }
              }
            ],
            status: 'passed',
            runtime: 0,
            tests: [
              {
                id: '972bbdda/bar',
                name: 'bar',
                fullName: ['Foo', 'bar'],
                suiteName: '972bbdda',
                status: 'passed',
                runtime: 0,
                errors: [],
                assertions: []
              }
            ],
            testCounts: { total: 1, passed: 1, skipped: 0, todo: 0, failed: 0 }
          }
        ],
        testCounts: { total: 4, passed: 4, skipped: 0, todo: 0, failed: 0 }
      }
    });
  }
}
