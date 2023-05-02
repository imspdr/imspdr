import { makeAutoObservable } from "mobx";

class TestStore {
  private __testId: number;
  constructor() {
    this.__testId = 0;
    makeAutoObservable(this);
  }

  get testId() {
    return this.__testId;
  }
  set testId(id: number) {
    this.__testId = id;
  }
}

export default TestStore;
