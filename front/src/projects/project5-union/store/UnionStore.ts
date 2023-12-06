import { makeAutoObservable, runInAction } from "mobx";
import { sleep } from "@src/common/util";


const jobIndex = {
  warrior: 0,
  magic: 1,
  thief: 2,
  arrow: 3,
  pirate: 4,
  xenon: 5,
};

class UnionStore {
  private __unionState: number[][];
  constructor() {
    this.__unionState = [];
    Object.values(jobIndex).forEach((num: number) => {
      this.__unionState[num] = [0, 0, 0, 0, 0];
    });
    makeAutoObservable(this);
  }

  setUnion = (job: string, level: number, num: number) => {
    const jobnum = Object.keys(jobIndex).findIndex((v: string) => v === job);
    if (!jobnum) return;
  };
}

export default UnionStore;
