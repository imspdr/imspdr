import { makeAutoObservable, action } from "mobx";
import { sleep } from "@src/common/util";

export type bar = {
  state: string;
  value: number;
};

const generateArray = (length: number) => {
  let ret: bar[] = [];
  for (let i = 0; i < length; i++) {
    ret.push({
      state: "normal",
      value: Math.round(Math.random() * 1000),
    });
  }
  return ret;
};

class SortStore {
  public compareCount: number;
  public sortAlgos: {
    label: string;
    value: string;
  }[];
  private __selectedAlgo: string;
  private __animateTime: number;
  private __arrayLength: number;
  private __stopFlag: boolean;
  private __numberArray: bar[];
  constructor() {
    this.compareCount = 0;
    this.__animateTime = 100;
    this.__arrayLength = 300;
    this.__numberArray = generateArray(this.arrayLength);
    this.__stopFlag = true;

    this.sortAlgos = [
      {
        label: "Merge Sort",
        value: "merge",
      },
      {
        label: "Bubble Sort",
        value: "bubble",
      },
      {
        label: "Bubble Sort2",
        value: "bubble2",
      },
      {
        label: "Bubble Sort3",
        value: "bubble3",
      },
    ];
    this.__selectedAlgo = "merge";

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
  get selectedAlgo() {
    return this.__selectedAlgo;
  }
  set selectedAlgo(algo: string) {
    this.__selectedAlgo = algo;
  }
  get arrayLength() {
    return this.__arrayLength;
  }
  set arrayLength(length: number) {
    this.__arrayLength = length;
  }
  get animateTime() {
    return this.__animateTime;
  }
  set animateTime(time: number) {
    this.__animateTime = time;
  }

  runSort = () => {
    switch (this.selectedAlgo) {
      case "merge":
        this.mergeSort();
        return;
      case "bubble":
      default:
        this.bubbleSort();
        return;
    }
  };
  reset = () => {
    this.compareCount = 0;
    this.numberArray = generateArray(this.arrayLength);
  };

  setState = (indexes: number[], state: string) => {
    indexes.forEach((i) => {
      if (this.numberArray[i]) {
        let val = this.numberArray[i]?.value;
        if (val)
          this.numberArray[i] = {
            value: val,
            state: state,
          };
      }
    });
  };
  setValues = (indexes: number[], values: number[]) => {
    indexes.forEach((ind, i) => {
      let ithVal = values[i];
      if (ithVal) {
        this.numberArray[ind] = {
          state: "normal",
          value: ithVal,
        };
      }
    });
  };

  // 버블
  swap = async (i: number, j: number) => {
    this.setState([i, j], "moving");
    await sleep(this.animateTime);
    const ival = this.numberArray[i]?.value;
    const jval = this.numberArray[j]?.value;
    if (ival && jval) {
      this.setValues([i, j], [jval, ival]);
    }
  };
  compare = async (i: number, j: number) => {
    this.setState([i, j], "compare");
    await sleep(this.animateTime);
    this.setState([i, j], "normal");
    this.compareCount++;
  };
  bubbleSort = async () => {
    this.stopFlag = false;
    for (let i = 0; i < this.numberArray.length - 1; i++) {
      for (let j = 0; j < this.numberArray.length - 1 - i; j++) {
        if (this.stopFlag) {
          return;
        }
        await this.compare(j, j + 1);
        let val1 = this.numberArray[j]?.value;
        let val2 = this.numberArray[j + 1]?.value;
        if (val1 && val2) {
          if (val1 > val2) await this.swap(j, j + 1);
        }
      }
    }
    this.stopFlag = true;
  };

  // 머지
  innerMerge = async (start: number, end: number) => {
    if (this.stopFlag) return;
    const middle = Math.round((start + end) / 2);
    const nowIndexes = [...new Array(end - start + 1)].map((_, i) => start + i);
    let tempArray: number[] = [];
    let left = start;
    let right = middle;

    this.setState(nowIndexes, "compare");
    await sleep(this.animateTime);
    this.compareCount += nowIndexes.length;
    this.setState(nowIndexes, "normal");

    for (let i = 0; i < end - start + 1; i++) {
      let leftVal = this.numberArray[left]?.value;
      let rightVal = this.numberArray[right]?.value;
      if (leftVal && left < middle) {
        if (rightVal && right <= end) {
          if (leftVal < rightVal) {
            tempArray.push(leftVal);
            left++;
          } else {
            tempArray.push(rightVal);
            right++;
          }
        } else {
          tempArray.push(leftVal);
          left++;
        }
      } else {
        if (rightVal && right <= end) {
          tempArray.push(rightVal);
          right++;
        }
      }
    }

    this.setState(nowIndexes, "moving");
    await sleep(this.animateTime);
    this.setState(nowIndexes, "normal");
    this.setValues(nowIndexes, tempArray);
  };
  innerDivide = async (start: number, end: number) => {
    if (this.stopFlag) return;
    if (start < end) {
      const middle = Math.ceil((end + start) / 2);
      await this.innerDivide(start, middle - 1);
      await this.innerDivide(middle, end);
      await this.innerMerge(start, end);
    }
  };
  mergeSort = async () => {
    this.stopFlag = false;
    await this.innerDivide(0, this.numberArray.length - 1);
    this.stopFlag = true;
  };
}

export default SortStore;
