import { makeAutoObservable } from "mobx";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class ChessStore {
  private __nQueen: number;
  private __poses: string;

  constructor() {
    this.__nQueen = 8;
    this.__poses = "";
    makeAutoObservable(this);
  }
  get nQueen() {
    return this.__nQueen;
  }
  set nQueen(n: number) {
    this.__nQueen = n;
    this.clear();
  }
  get poses() {
    return this.__poses;
  }
  set poses(poses: string) {
    this.__poses = poses;
  }

  clear = () => {
    this.poses = "";
  };

  addQueenOnPos = (x: number, y: number) => {
    const pos = `${alphabet[x]}${y},`;
    if (this.poses.includes(pos)) {
      this.poses = this.poses.replace(pos, "");
    } else if (!this.isCovered(x, y)) {
      this.poses = this.poses + pos;
    }
  };
  included = (x: number, y: number) => {
    const pos = `${alphabet[x]}${y},`;
    return this.poses.includes(pos);
  };
  isCovered = (x: number, y: number) => {
    let ret = false;
    this.poses.split(",").forEach((pos) => {
      const givenX = pos[0];
      const givenY = Number(pos.slice(1));
      if (givenX) {
        const alpha = alphabet.indexOf(givenX);
        if (alpha === x || givenY === y) {
          ret = true;
          return;
        }
        if (Math.abs(alpha - x) === Math.abs(givenY - y)) {
          ret = true;
          return;
        }
      }
    });
    return ret;
  };
}

export default ChessStore;
