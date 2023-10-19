import { makeAutoObservable } from "mobx";

class TestStore {
  private __testId: number;
  private __tabValue: number;
  constructor() {
    this.__testId = 0;
    this.__tabValue = 0;
    makeAutoObservable(this);
  }

  get testId() {
    return this.__testId;
  }
  get tabValue() {
    return this.__tabValue;
  }
  set testId(id: number) {
    this.__testId = id;
  }
  set tabValue(val: number) {
    this.__tabValue = val;
  }
}

export default TestStore;
