import { QUnitMetaEnabled } from 'qunit';

export default function patchQUnit(QUnit: QUnit) {
  const oldQUnitModule: any = QUnit.module;
  const oldQUnitTest: any = QUnit.test;

  function newQunitModule(name: string, hooks?: Hooks, nested?: (hooks: NestedHooks) => void): QUnitMetaEnabled;
  function newQunitModule(name: string, nested?: (hooks: NestedHooks) => void): QUnitMetaEnabled;
  function newQunitModule(_name: string, _hooksOrNested?: Hooks | ((hooks: NestedHooks) => void), _nested?: (hooks: NestedHooks) => void): QUnitMetaEnabled {
    return oldQUnitModule(...arguments);
  }
  function newQUnitTest(_name: string, _callback: (assert: Assert) => void): QUnitMetaEnabled {
    return oldQUnitTest(...arguments);
  };
  QUnit.module = newQunitModule;
  QUnit.test = newQUnitTest;
}