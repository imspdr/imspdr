import { makeAutoObservable, action } from "mobx";
import { getHistogram } from "./calculateUtils";
import irisSample from "./irisSample.json";

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

  // histogram
  private __selectedColumn: string;
  public histogramData: {
    bins: number[];
    counts: number[];
  };

  // scatter plot
  private __scatterColumn1: string;
  private __scatterColumn2: string;
  private __scatterLabelColumn: string;
  public scatterData: {
    num1: number[];
    num2: number[];
    label?: string[];
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

    this.__scatterColumn1 = "";
    this.__scatterColumn2 = "";
    this.__scatterLabelColumn = "";
    this.scatterData = {
      num1: [],
      num2: [],
      label: undefined,
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

  //scatter
  get scatterColumn1() {
    return this.__scatterColumn1;
  }
  get scatterColumn2() {
    return this.__scatterColumn2;
  }
  get scatterLabelColumn() {
    return this.__scatterLabelColumn;
  }
  set scatterColumn1(given: string) {
    this.__scatterColumn1 = given;
    const numData = this.numericData.find((num) => num.name === given);
    if (numData) {
      this.scatterData = {
        ...this.scatterData,
        num1: numData.value,
      };
    } else {
      this.scatterData = {
        ...this.scatterData,
        num1: [],
      };
    }
  }
  set scatterColumn2(given: string) {
    this.__scatterColumn2 = given;
    const numData = this.numericData.find((num) => num.name === given);
    if (numData) {
      this.scatterData = {
        ...this.scatterData,
        num2: numData.value,
      };
    } else {
      this.scatterData = {
        ...this.scatterData,
        num2: [],
      };
    }
  }
  set scatterLabelColumn(given: string) {
    this.__scatterLabelColumn = given;
    const labelData = this.categoricalData.find((num) => num.name === given);
    if (labelData) {
      this.scatterData = {
        ...this.scatterData,
        label: labelData.value,
      };
    } else {
      this.scatterData = {
        ...this.scatterData,
        label: undefined,
      };
    }
  }

  loadSample = () => {
    this.givenData = irisSample;
  };
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
      this.scatterColumn1 = this.numericData[0]!.name;
      if (this.numericData.length > 1) {
        this.scatterColumn2 = this.numericData[1]!.name;
      } else {
        this.scatterColumn2 = "";
      }
    } else {
      this.scatterColumn1 = "";
      this.scatterColumn2 = "";
      this.selectedColumn = "";
    }
    if (this.categoricalData.length > 0) {
      this.scatterLabelColumn = this.categoricalData[0]!.name;
    } else {
      this.scatterLabelColumn = "";
    }
  };
}

export default CellStore;
