import { makeAutoObservable } from "mobx";

class TimeseriesStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default TimeseriesStore;
