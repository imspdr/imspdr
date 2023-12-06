import { makeAutoObservable, runInAction } from "mobx";
import { sleep } from "@src/common/util";


const JOBS = ["warrior", "magician", "arrow", "thief", "pirate", "xenon"];
const RANK = ["b", "a", "s", "ss", "sss"];

type unionVal = {
  rank: string;
  num: number;
};

type jobUnion = {
  job: string;
  values: unionVal[];
};

class UnionStore {
  private __unionState: jobUnion[];
  constructor() {
    this.__unionState = JOBS.map((job: string) => {
      return {
        job: job,
        values: RANK.map((rank: string) => {
          return {
            rank: rank,
            num: 0,
          };
        }),
      };
    });
    makeAutoObservable(this);
  }
  get unionState() {
    return this.__unionState;
  }
  set unionState(val: jobUnion[]) {
    this.__unionState = val;
  }
  setUnion = (job: string, rank: string, num: number) => {
    this.unionState = this.unionState.map((jobUnion: jobUnion) => {
      if (jobUnion.job === job) {
        return {
          job: job,
          values: jobUnion.values.map((unionVal: unionVal) => {
            if (unionVal.rank === rank) {
              return {
                rank: rank,
                num: num,
              };
            } else return unionVal;
          }),
        };
      } else {
        return jobUnion;
      }
    });
  };
}

export default UnionStore;
