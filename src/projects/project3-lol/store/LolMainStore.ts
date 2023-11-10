import { makeAutoObservable } from "mobx";
import { sleep } from "@src/common/util";

class LolMainStore {
  private __nowName: string | undefined;
  constructor() {
    this.__nowName = undefined;
    makeAutoObservable(this);
  }
  get nowName() {
    return this.__nowName ? this.__nowName : "";
  }
  set nowName(name: string) {
    this.__nowName = name;
  }
}

export default LolMainStore;
