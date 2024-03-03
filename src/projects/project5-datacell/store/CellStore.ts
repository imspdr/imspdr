import { makeAutoObservable, action } from "mobx";
import { getHistogram } from "./calculateUtils";

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

  private __selectedColumn: string;
  public histogramData: {
    bins: number[];
    counts: number[];
  };

  constructor() {
    this.__givenData = [];
    this.__categoricalData = [];
    this.__numericData = [];
    this.__selectedColumn = "";
    this.histogramData = {
      bins: [],
      counts: [],
    };
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
  get selectedColumn() {
    return this.__selectedColumn;
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
  set selectedColumn(given: string) {
    this.__selectedColumn = given;

    const numData = this.numericData.find((num) => num.name === given);
    if (numData) this.histogramData = getHistogram(numData.value);
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
      this.givenData.forEach((row: string[], j) => {
        if (j > 0) {
          let now = row[index];
          if (now) {
            now = now.replaceAll("\n", "").replaceAll("\r", "");
            if (numberRegex.test(now)) {
              numeric += 1;
            } else {
              strType += 1;
            }
            tempArray.push(now);
          }
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
    if (this.numericData.length > 0) {
      this.selectedColumn = this.numericData[0]!.name;
    }
  };
}

export default CellStore;
