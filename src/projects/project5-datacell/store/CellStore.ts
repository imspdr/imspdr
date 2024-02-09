import { makeAutoObservable, action } from "mobx";

class CellStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default CellStore;
