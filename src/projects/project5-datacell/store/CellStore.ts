import { makeAutoObservable, action } from "mobx";

type numericColumn = {
  name: string;
  value: number[];
};
type categoricalColumn = {
  name: string;
  value: string[];
};

const numberRegex = /^[-+]?\d*\.?\d+$/;

class CellStore {
  private __givenData: string[][];
  private __numericData: numericColumn[];
  private __categoricalData: categoricalColumn[];

  constructor() {
    this.__givenData = [];
    this.__categoricalData = [];
    this.__numericData = [];
    makeAutoObservable(this);
  }
  get givenData() {
    return this.__givenData;
  }
  get numericData() {
    return this.__numericData;
  }
  get categoricalData() {
    return this.__categoricalData;
  }
  set givenData(given: string[][]) {
    this.__givenData = given;
  }
  set numericData(given: numericColumn[]) {
    this.__numericData = given;
  }
  set categoricalData(given: categoricalColumn[]) {
    this.__categoricalData = given;
  }

  generateData = () => {
    if (this.givenData.length < 2) return;
    const cols = this.givenData[0];
    if (!cols) return;
    this.numericData = [];
    this.categoricalData = [];
    cols.map((colName, index) => {
      let numeric = 0;
      let strType = 0;
      let tempArray: string[] = [];
      this.givenData.forEach((row: string[]) => {
        let now = row[index];
        if (now) {
          if (numberRegex.test(now)) {
            numeric += 1;
          } else {
            strType += 1;
          }
          tempArray.push(now);
        }
      });
      if (numeric > strType * 2) {
        this.numericData = [
          ...this.numericData,
          {
            name: colName,
            value: tempArray.map((v) => (numberRegex.test(v) ? Number(v) : 0)),
          },
        ];
      } else {
        let tempSet = new Set(tempArray);
        if (Array.from(tempSet).length < 20) {
          this.categoricalData = [
            ...this.categoricalData,
            {
              name: colName,
              value: tempArray,
            },
          ];
        }
      }
    });
  };
}

export default CellStore;
