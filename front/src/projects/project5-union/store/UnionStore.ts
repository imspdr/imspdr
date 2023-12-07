import { makeAutoObservable, runInAction } from "mobx";
import { unionVal, jobUnion, RANK, JOBS } from "./types";
import { sleep } from "@src/common/util";





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
