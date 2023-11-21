import { makeAutoObservable, runInAction } from "mobx";
import { sleep } from "@src/common/util";
import { fruit } from "./types";
import { circleCollision } from "./physics";

const MAXHEIGHT = 700;
const MAXWIDTH = 500;
const LOSSRATE = 1;
const EPSILON = 0.00001;

class SuikaStore {
  public fruits: fruit[];
  public interval: NodeJS.Timeout | undefined;
  public stopFlag: boolean;
  private __posX: number;
  private __nowRadius: number;
  constructor() {
    this.fruits = [];
    this.__posX = 250;
    this.__nowRadius = 40;
    this.stopFlag = true;
    makeAutoObservable(this);
  }
  get posX() {
    return this.__posX;
  }
  set posX(pos: number) {
    this.__posX = pos;
  }
  get nowRadius() {
    return this.__nowRadius;
  }
  set nowRadius(num: number) {
    this.__nowRadius = num;
  }
  start = () => {
    this.stopFlag = false;
    this.interval = setInterval(() => {
      this.unitAction(0.1);
    }, 10);
  };
  stop = () => {
    this.stopFlag = true;
    if (this.interval) clearInterval(this.interval);
  };
  addFruit = async () => {
    this.fruits.push({
      radius: this.nowRadius,
      pos: {
        x: this.posX,
        y: this.nowRadius,
      },
      velocity: { x: 0, y: 0 },
      accel: { x: 0, y: 9.8 },
    });
  };
  unitAction = (t: number) => {
    runInAction(() => {
      if (this.fruits.length >= 2) {
        // collision
        for (let i = 0; i < this.fruits.length; i++) {
          for (let j = i + 1; j < this.fruits.length; j++) {
            let newFruits = circleCollision(this.fruits[i]!, this.fruits[j]!);
            this.fruits = this.fruits.map((fruit, index) => {
              if (index === i) {
                return newFruits.fruit1;
              } else if (index === j) {
                return newFruits.fruit2;
              } else return fruit;
            });
          }
        }
      }

      this.fruits = this.fruits.map((fruit: fruit) => {
        let newX = fruit.pos.x + fruit.velocity.x * t;
        let newY = fruit.pos.y + fruit.velocity.y * t;
        let newVeloX = fruit.velocity.x + fruit.accel.x * t;
        let newVeloY = fruit.velocity.y + fruit.accel.y * t;
        if (newY > MAXHEIGHT - fruit.radius) {
          newY = MAXHEIGHT - fruit.radius;
          newVeloY = -(1 - LOSSRATE) * newVeloY;
        }
        if (newY < fruit.radius) {
          newY = fruit.radius;
          newVeloY = 0;
        }
        if (newX > MAXWIDTH - fruit.radius) {
          newX = MAXWIDTH - fruit.radius;
          newVeloX = -(1 - LOSSRATE) * newVeloX;
        }
        if (newX < fruit.radius) {
          newX = fruit.radius;
          newVeloX = -(1 - LOSSRATE) * newVeloX;
        }
        if (Math.abs(newVeloX) < EPSILON) newVeloX = 0;
        if (Math.abs(newVeloY) < EPSILON) newVeloY = 0;
        return {
          ...fruit,
          velocity: {
            x: newVeloX,
            y: newVeloY,
          },
          pos: {
            x: newX,
            y: newY,
          },
        };
      });
    });
  };
}

export default SuikaStore;
