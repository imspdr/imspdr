import { makeAutoObservable, runInAction } from "mobx";
import { sleep } from "@src/common/util";
import { fruit } from "./types";
import { circleCollision } from "./physics";

const MAXHEIGHT = 700;
const MAXWIDTH = 500;
const LOSSRATE = 0.9;
const EPSILON = 0.00001;

class SuikaStore {
  public fruits: (fruit | undefined)[];
  public interval: NodeJS.Timeout | undefined;
  public stopFlag: boolean;
  public createFlag: boolean;
  private __posX: number;
  private __nowRadius: number;
  constructor() {
    this.fruits = [];
    this.__posX = 250;
    this.__nowRadius = 20;
    this.stopFlag = true;
    this.createFlag = false;
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
      this.unitAction(0.01);
    }, 10);
  };
  stop = () => {
    this.stopFlag = true;
    if (this.interval) clearInterval(this.interval);
  };
  reset = () => {
    this.fruits = [];
  };
  addFruit = async () => {
    if (this.createFlag) return;
    this.createFlag = true;
    await sleep(500);
    this.fruits.push({
      radius: this.nowRadius,
      pos: {
        x: this.posX,
        y: this.nowRadius * 2,
      },
      velocity: { x: 0, y: 5 },
      accel: { x: 0, y: 9.8 },
      fillIndex: 0,
    });
    runInAction(() => {
      this.createFlag = false;
    });
  };
  unitAction = (t: number) => {
    runInAction(() => {
      for (let n = 0; n < 10; n++) {
        // unit move
        this.fruits = this.fruits
          .filter((data: fruit | undefined) => !!data)
          .map((fruit: fruit | undefined) => {
            if (!fruit) return undefined;
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

        // resolve collision
        if (this.fruits.length >= 2) {
          for (let i = 0; i < this.fruits.length; i++) {
            for (let j = i + 1; j < this.fruits.length; j++) {
              if (!this.fruits[i] || !this.fruits[j]) continue;
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
      }
    });
  };
}

export default SuikaStore;
