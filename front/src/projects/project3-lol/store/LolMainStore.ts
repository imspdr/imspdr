import { makeAutoObservable, runInAction } from "mobx";
import { RiotAPI } from "./api";
import { lolUser } from "./types";
import id2name from "./id2name.json";

type idname = {
  id: number;
  name: string;
};
type tempMost = {
  champ: number;
  point: number;
};

class LolMainStore {
  public nowUsers: lolUser[];
  public nowIndex: number;

  private __nowName: string;
  private __loading: boolean;
  private __showResult: boolean;

  constructor() {
    this.__nowName = "";
    this.__showResult = false;
    this.__loading = false;
    this.nowUsers = [];
    this.nowIndex = 0;

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

  updateToken = async (key: string, password: string) => {
    if (key.length > 0 && password.length > 0) {
      const ret = await RiotAPI.updateToken(key, password);
      if (ret && ret.status === "success") {
        return "success";
      }
    } else {
      return "fail";
    }
  };

  onSearch = async (name: string) => {
    if (name.length > 0) {
      this.showResult = true;
      this.loading = true;

      const ind = this.nowUsers.findIndex((user: lolUser) => user.name === name);
      if (ind >= 0) {
        this.nowIndex = ind;
        this.loading = false;
        return;
      }
      let apiRet = await RiotAPI.getUserInfo(name);
      runInAction(() => {
        if (apiRet && apiRet.status === "success") {
          const ret = apiRet.data;
          const processdRet = {
            ...ret,
            mosts: ret.mosts.map((mo: tempMost) => {
              const find = id2name.find((idname: idname) => idname.id === mo.champ);
              return {
                champ: find ? find.name : "not found",
                point: mo.point,
              };
            }),
          };
          this.nowUsers = [processdRet, ...this.nowUsers.slice(0, 9)];
          this.nowIndex = 0;
        } else {
          this.nowIndex = -1;
        }
        this.loading = false;
      });
    }
  };
}

export default LolMainStore;
