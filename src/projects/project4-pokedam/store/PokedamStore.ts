import { makeAutoObservable, runInAction } from "mobx";
import { pokemon, habcds } from "./types";

class PokedamStore {
  private __attacker: pokemon | undefined;
  private __opponent: pokemon | undefined;
  private __history: pokemon[];

  constructor() {
    this.__history = [];
    makeAutoObservable(this);
  }

  get attacker() {
    return this.__attacker;
  }
  get opponent() {
    return this.__opponent;
  }
  get history() {
    return this.__history;
  }
  set attacker(poke: pokemon | undefined) {
    this.__attacker = poke;
  }
  set opponent(poke: pokemon | undefined) {
    this.__opponent = poke;
  }
  set history(pokes: pokemon[]) {
    this.__history = pokes;
  }

  setOption = (isAttacker: boolean, option: string, option2: string, value: number) => {};
}

export default PokedamStore;
