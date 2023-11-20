import { makeAutoObservable } from "mobx";
import { sleep } from "@src/common/util";
import { fruit } from "./types";

const MAXHEIGHT = 700;
const MAXWIDTH = 500;

class SuikaStore {
  public fruits: fruit[];
  public interval: NodeJS.Timeout | undefined;
  public stopFlag: boolean;
  constructor() {
    this.fruits = [];
    this.stopFlag = true;
    makeAutoObservable(this);
  }

  start = () => {
    this.stopFlag = false;
    this.interval = setInterval(() => {
      this.unitAction(0.1);
    }, 1);
  };
  stop = () => {
    this.stopFlag = true;
    if (this.interval) clearInterval(this.interval);
  };
  addFruit = () => {
    this.fruits.push({
      radius: 10,
      pos: {
        x: 250,
        y: 0,
      },
      velocity: { x: 0, y: 0 },
      accel: { x: 0, y: 9.8 },
    });
  };
  unitAction = (t: number) => {
    this.fruits = this.fruits.map((fruit: fruit) => {
      return {
        ...fruit,
        velocity: {
          x: fruit.velocity.x + fruit.accel.x * t,
          y: fruit.velocity.y + fruit.accel.y * t,
        },
        pos: {
          x: Math.min(MAXWIDTH, fruit.pos.x + fruit.velocity.x * t),
          y: Math.min(MAXHEIGHT, fruit.pos.y + fruit.velocity.y * t),
        },
      };
    });
  };
}

export default SuikaStore;
