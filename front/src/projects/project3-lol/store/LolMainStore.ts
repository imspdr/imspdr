import { makeAutoObservable, runInAction } from "mobx";
import { RiotAPI } from "./api";
import { lolUser, most } from "./types";
import id2name from "./id2name.json";
import { sleep } from "@src/common/util";

type idname = {
  id: number;
  name: string;
};
type tempMost = {
  champ: number;
  point: number;
};

const sample = {
  id: "7b5d-UQTYHb9gfPE1vsIkLtXODH5i_pPc0gO1z_m-38CsYKo8hg2h5VEXpZqfmAJcUagYs6_pXGFjw",
  lastGames: [
    {
      assist: 1,
      championName: "Shyvana",
      death: 2,
      kill: 3,
      win: 0,
    },
    {
      assist: 7,
      championName: "Shyvana",
      death: 5,
      kill: 1,
      win: 0,
    },
    {
      assist: 2,
      championName: "Shyvana",
      death: 7,
      kill: 3,
      win: 0,
    },
    {
      assist: 5,
      championName: "JarvanIV",
      death: 4,
      kill: 2,
      win: 0,
    },
    {
      assist: 3,
      championName: "Shyvana",
      death: 2,
      kill: 1,
      win: 1,
    },
    {
      assist: 5,
      championName: "Shyvana",
      death: 7,
      kill: 6,
      win: 1,
    },
    {
      assist: 5,
      championName: "Shyvana",
      death: 5,
      kill: 3,
      win: 0,
    },
    {
      assist: 10,
      championName: "Shyvana",
      death: 2,
      kill: 6,
      win: 1,
    },
    {
      assist: 8,
      championName: "Shyvana",
      death: 1,
      kill: 3,
      win: 1,
    },
    {
      assist: 2,
      championName: "Shyvana",
      death: 6,
      kill: 5,
      win: 0,
    },
  ],
  mosts: [
    {
      champ: 106,
      point: 762059,
    },
    {
      champ: 59,
      point: 443776,
    },
    {
      champ: 102,
      point: 283614,
    },
    {
      champ: 32,
      point: 257300,
    },
    {
      champ: 11,
      point: 243856,
    },
  ],
  name: "\uac70\ubbfc\ub370\uc694",
  tierList: [
    {
      leaguePoints: 80,
      losses: 4,
      queueType: "RANKED_FLEX_SR",
      rank: "III",
      tier: "BRONZE",
      wins: 1,
    },
    {
      leaguePoints: 4,
      losses: 11,
      queueType: "RANKED_SOLO_5x5",
      rank: "I",
      tier: "GOLD",
      wins: 16,
    },
  ],
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

  onSearch = async (name: string) => {
    if (name.length > 0) {
      this.showResult = true;
      this.loading = true;

      // const sample2 = {
      //   ...sample,
      //   mosts: sample.mosts.map((mo: tempMost) => {
      //     const find = id2name.find((idname: idname) => idname.id === mo.champ);
      //     return {
      //       champ: find ? find.name : "not found",
      //       point: mo.point,
      //     };
      //   }),
      // };
      // this.nowUsers = [sample2];
      // this.loading = false;
      let apiRet = await RiotAPI.getPUUID(name);
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
          console.log(processdRet);
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
