import { makeAutoObservable } from "mobx";

class ChessStore {
  public nQueen: number;
  public boardSize: number;
  public poses: {
    x: number;
    y: number;
  }[];
  constructor() {
    this.nQueen = 4;
    this.boardSize = 800;
    this.poses = [];
    makeAutoObservable(this);
  }
}

export default ChessStore;
