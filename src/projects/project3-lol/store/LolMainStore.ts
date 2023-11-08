import { makeAutoObservable } from "mobx";
import { sleep } from "@src/common/util";

class LolMainStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default LolMainStore;
