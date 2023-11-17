import { makeAutoObservable } from "mobx";
import { sleep } from "@src/common/util";

class SuikaStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default SuikaStore;
