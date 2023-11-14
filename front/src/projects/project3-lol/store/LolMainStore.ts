import { makeAutoObservable, runInAction } from "mobx";
import { RiotAPI } from "./api";
import { lolUser } from "./types";
import { sleep } from "@src/common/util";

class LolMainStore {
  public nowUsers: lolUser[];

  private __nowName: string;
  private __loading: boolean;
  private __showResult: boolean;

  constructor() {
    this.__nowName = "";
    this.__showResult = false;
    this.__loading = false;
    this.nowUsers = [];

    makeAutoObservable(this);
  }
  get nowName() {
    return this.__nowName;
  }
  get showResult() {
    return this.__showResult;
  }
  get loading() {
    return this.__loading;
  }
  set nowName(name: string) {
    this.__nowName = name;
  }
  set showResult(bool: boolean) {
    this.__showResult = bool;
  }
  set loading(bool: boolean) {
    this.__loading = bool;
  }

  onSearch = async (name: string) => {
    this.loading = true;
    const ret = await RiotAPI.getPUUID(name);

    runInAction(() => {
      if (ret) this.nowUsers = [ret, ...this.nowUsers];
      this.loading = false;
      this.showResult = true;
    });
  };
}

export default LolMainStore;
