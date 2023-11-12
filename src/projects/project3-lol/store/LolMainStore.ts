import { makeAutoObservable } from "mobx";
import { RiotAPI } from "./api";
import { sleep } from "@src/common/util";

class LolMainStore {
  public puuid: string;
  public encodedName: string;

  private __nowName: string;
  constructor() {
    this.__nowName = "";
    this.puuid = "";
    this.encodedName = "";
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
    this.encodedName = ret.name;
    this.puuid = ret.puuid;
  };
}

export default LolMainStore;
