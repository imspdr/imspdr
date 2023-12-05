import { makeAutoObservable, runInAction } from "mobx";
import { sleep } from "@src/common/util";

class UnionStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default UnionStore;
