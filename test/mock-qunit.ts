export const qunitConfigOnly: Pick<QUnit, 'config'> = {
  config: {
    modules: [
      {
        name: 'Foo',
        parentModule: null,
        tests: [{ name: 'bar', testId: '3a88881d', skip: false }],
        moduleId: '972bbdda',
        testsRun: 1,
        unskippedTestsRun: 1,
        childModules: [],
        suiteReport: {
          name: 'Foo',
          fullName: ['Foo'],
          tests: [
            {
              name: 'bar',
              suiteName: 'Foo',
              fullName: ['Foo', 'bar'],
              runtime: 0,
              assertions: [{ passed: true, message: 'baz', todo: false }],
              skipped: false,
              todo: false,
              valid: true,
              _startTime: 1533709965523,
              _endTime: 1533709965525
            }
          ],
          childSuites: [],
          _startTime: 1533709965523,
          _endTime: 1533709965526
        },
        testEnvironment: {},
        hooks: null,
        stats: { all: 1, bad: 0, started: 1533709965523 }
      },
      {
        name: 'EventDataTest',
        parentModule: null,
        tests: [
          { name: 'foo', testId: '5fb4ec20', skip: false },
          {
            name:
              'QUnit begin event can be converted into a runStart js-runners event',
            testId: '8e2ded90',
            skip: false
          },
          {
            name:
              'QUnit moduleStart event can be converted into a suiteStart js-runners event',
            testId: '0e2a4dea',
            skip: false
          },
          {
            name:
              'QUnit moduleDone event can be converted into a suiteEnd js-runners event',
            testId: '8dc802cb',
            skip: false
          },
          {
            name:
              'QUnit testStart event can be converted into a testStart js-runners event',
            testId: '9508ded4',
            skip: false
          },
          {
            name:
              'QUnit testDone event can be converted into a testEnd js-runners event',
            testId: '5fdf8875',
            skip: false
          },
          {
            name:
              'QUnit done event can be converted into a runEnd js-runners event',
            testId: '9ab45552',
            skip: false
          }
        ],
        moduleId: '5880552a',
        testsRun: 7,
        unskippedTestsRun: 7,
        childModules: [],
        suiteReport: {
          name: 'EventDataTest',
          fullName: ['EventDataTest'],
          tests: [
            {
              name: 'foo',
              suiteName: 'EventDataTest',
              fullName: ['EventDataTest', 'foo'],
              runtime: 0,
              assertions: [{ passed: true, message: 'it works', todo: false }],
              skipped: false,
              todo: false,
              valid: true,
              _startTime: 1533709965526,
              _endTime: 1533709965526
            },
            {
              name:
                'QUnit begin event can be converted into a runStart js-runners event',
              suiteName: 'EventDataTest',
              fullName: [
                'EventDataTest',
                'QUnit begin event can be converted into a runStart js-runners event'
              ],
              runtime: 0,
              assertions: [{ passed: true, message: 'okay', todo: false }],
              skipped: false,
              todo: false,
              valid: true,
              _startTime: 1533709965526,
              _endTime: 1533709965526
            },
            {
              name:
                'QUnit moduleStart event can be converted into a suiteStart js-runners event',
              suiteName: 'EventDataTest',
              fullName: [
                'EventDataTest',
                'QUnit moduleStart event can be converted into a suiteStart js-runners event'
              ],
              runtime: 0,
              assertions: [{ passed: true, message: 'okay', todo: false }],
              skipped: false,
              todo: false,
              valid: true,
              _startTime: 1533709965527,
              _endTime: 1533709965527
            },
            {
              name:
                'QUnit moduleDone event can be converted into a suiteEnd js-runners event',
              suiteName: 'EventDataTest',
              fullName: [
                'EventDataTest',
                'QUnit moduleDone event can be converted into a suiteEnd js-runners event'
              ],
              runtime: 0,
              assertions: [{ passed: true, message: 'okay', todo: false }],
              skipped: false,
              todo: false,
              valid: true,
              _startTime: 1533709965527,
              _endTime: 1533709965528
            },
            {
              name:
                'QUnit testStart event can be converted into a testStart js-runners event',
              suiteName: 'EventDataTest',
              fullName: [
                'EventDataTest',
                'QUnit testStart event can be converted into a testStart js-runners event'
              ],
              runtime: 0,
              assertions: [{ passed: true, message: 'okay', todo: false }],
              skipped: false,
              todo: false,
              valid: true,
              _startTime: 1533709965528,
              _endTime: 1533709965528
            },
            {
              name:
                'QUnit testDone event can be converted into a testEnd js-runners event',
              suiteName: 'EventDataTest',
              fullName: [
                'EventDataTest',
                'QUnit testDone event can be converted into a testEnd js-runners event'
              ],
              runtime: 0,
              assertions: [{ passed: true, message: 'okay', todo: false }],
              skipped: false,
              todo: false,
              valid: true,
              _startTime: 1533709965529,
              _endTime: 1533709965529
            },
            {
              name:
                'QUnit done event can be converted into a runEnd js-runners event',
              suiteName: 'EventDataTest',
              fullName: [
                'EventDataTest',
                'QUnit done event can be converted into a runEnd js-runners event'
              ],
              runtime: 0,
              assertions: [{ passed: true, message: 'okay', todo: false }],
              skipped: false,
              todo: false,
              valid: true,
              _startTime: 1533709965529,
              _endTime: 1533709965530
            }
          ],
          childSuites: [],
          _startTime: 1533709965526,
          _endTime: 1533709965530
        },
        testEnvironment: {},
        hooks: null,
        stats: { all: 7, bad: 0, started: 1533709965526 }
      },
      {
        name: 'test-ui-qunit-client tests',
        parentModule: null,
        tests: [
          { name: 'Exports are correct', testId: '66baa443', skip: false }
        ],
        moduleId: '04c201f6',
        testsRun: 1,
        unskippedTestsRun: 1,
        childModules: [],
        suiteReport: {
          name: 'test-ui-qunit-client tests',
          fullName: ['test-ui-qunit-client tests'],
          tests: [
            {
              name: 'Exports are correct',
              suiteName: 'test-ui-qunit-client tests',
              fullName: ['test-ui-qunit-client tests', 'Exports are correct'],
              runtime: 0,
              assertions: [
                {
                  passed: true,
                  message: 'QUnitTestClient exists',
                  todo: false
                },
                { passed: true, message: 'QUnitTestServer exists', todo: false }
              ],
              skipped: false,
              todo: false,
              valid: true,
              _startTime: 1533709965530,
              _endTime: 1533709965531
            }
          ],
          childSuites: [],
          _startTime: 1533709965530,
          _endTime: 1533709965531
        },
        testEnvironment: {},
        hooks: null,
        stats: { all: 2, bad: 0, started: 1533709965530 }
      },
      {
        name: 'Foo',
        parentModule: null,
        tests: [{ name: 'bar', testId: '3a88881d', skip: false }],
        moduleId: '972bbdda',
        testsRun: 1,
        unskippedTestsRun: 1,
        childModules: [],
        suiteReport: {
          name: 'Foo',
          fullName: ['Foo'],
          tests: [
            {
              name: 'bar',
              suiteName: 'Foo',
              fullName: ['Foo', 'bar'],
              runtime: 0,
              assertions: [{ passed: true, message: 'baz', todo: false }],
              skipped: false,
              todo: false,
              valid: true,
              _startTime: 1533709965531,
              _endTime: 1533709965531
            }
          ],
          childSuites: [],
          _startTime: 1533709965531,
          _endTime: 1533709965531
        },
        testEnvironment: {},
        hooks: null,
        stats: { all: 1, bad: 0, started: 1533709965531 }
      }
    ]
  }
} as any;
