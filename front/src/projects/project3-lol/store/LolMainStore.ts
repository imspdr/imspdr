import { makeAutoObservable, runInAction } from "mobx";
import { RiotAPI } from "./api";
import { lolUser } from "./types";
import { sleep } from "@src/common/util";

class LolMainStore {
  public nowUsers: lolUser[];

  private __nowName: string;
  constructor() {
    this.__nowName = "";
    this.nowUsers = [];
    makeAutoObservable(this);
  }
  get nowName() {
    return this.__nowName;
  }
  set nowName(name: string) {
    this.__nowName = name;
  }

  onSearch = async (name: string) => {
    const ret = await RiotAPI.getPUUID(name);

    runInAction(() => {
      if (ret) this.nowUsers = [ret, ...this.nowUsers];
    });
  };
}

export default LolMainStore;
