import { makeAutoObservable, action } from "mobx";

class CellStore {
  private __givenData: string[][];
  constructor() {
    this.__givenData = [];
    makeAutoObservable(this);
  }
  get givenData() {
    return this.__givenData;
  }
  set givenData(given: string[][]) {
    this.__givenData = given;
  }
}

export default CellStore;
