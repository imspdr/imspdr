import { makeAutoObservable } from "mobx";
import { sleep } from "@src/common/util";

export type bar = {
  id: number;
  state: string;
  value: number;
};

const generateArray = (length: number) => {
  let ret: bar[] = [];
  for (let i = 0; i < length; i++) {
    ret.push({
      id: i,
      state: "normal",
      value: Math.round(Math.random() * 1000),
    });
  }
  return ret;
};

class SortStore {
  public animationTime: number;
  public compareCount: number;
  public swapCount: number;
  public iterState: number;
  private __stopFlag: boolean;
  private __numberArray: bar[];
  constructor() {
    this.animationTime = 0;
    this.compareCount = 0;
    this.swapCount = 0;
    this.iterState = 0;
    this.__numberArray = generateArray(100);
    this.__stopFlag = true;
    makeAutoObservable(this);
  }
  get numberArray() {
    return this.__numberArray;
  }
  set numberArray(numArray: bar[]) {
    this.__numberArray = numArray;
  }
  get stopFlag() {
    return this.__stopFlag;
  }
  set stopFlag(bool: boolean) {
    this.__stopFlag = bool;
  }

  reset = () => {
    this.compareCount = 0;
    this.swapCount = 0;
    this.iterState = 0;
    this.numberArray = generateArray(100);
  };

  setState = (indexes: number[], state: string) => {
    indexes.forEach((i) => {
      if (this.numberArray[i]) {
        let val = this.numberArray[i]?.value;
        if (val)
          this.numberArray[i] = {
            id: i,
            value: val,
            state: state,
          };
      }
    });
  };
  swap = async (i: number, j: number) => {
    this.setState([i, j], "moving");
    await sleep(this.animationTime);
    const ival = this.numberArray[i]?.value;
    const jval = this.numberArray[j]?.value;
    if (ival && jval) {
      this.numberArray[j] = {
        id: j,
        value: ival,
        state: "normal",
      };
      this.numberArray[i] = {
        id: i,
        value: jval,
        state: "normal",
      };
    }
    this.swapCount++;
  };

  compare = async (i: number, j: number) => {
    this.setState([i, j], "compare");
    await sleep(this.animationTime);
    this.setState([i, j], "normal");
    this.compareCount++;
  };

  bubbleSort = async () => {
    this.stopFlag = false;
    for (; this.iterState < this.numberArray.length - 1; this.iterState++) {
      for (let j = 0; j < this.numberArray.length - 1 - this.iterState; j++) {
        await this.compare(j, j + 1);
        let val1 = this.numberArray[j]?.value;
        let val2 = this.numberArray[j + 1]?.value;
        if (val1 && val2) {
          if (val1 > val2) await this.swap(j, j + 1);
        }
      }
      if (this.stopFlag) {
        return;
      }
    }
    this.stopFlag = true;
    this.iterState = 0;
  };
}

export default SortStore;
