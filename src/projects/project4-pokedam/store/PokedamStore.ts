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
    if (this.attacker) {
      this.history = [this.attacker, ...this.history.filter((_, i) => i < 9)];
    }
    this.__attacker = poke;
  }
  set opponent(poke: pokemon | undefined) {
    if (this.opponent) {
      this.history = [this.opponent, ...this.history.filter((_, i) => i < 9)];
    }
    this.__opponent = poke;
  }
  set history(pokes: pokemon[]) {
    this.__history = pokes;
  }

  setOption = (
    isAttacker: boolean,
    option: keyof pokemon,
    option2: keyof habcds,
    value: number
  ) => {
    if (option === "pokemonType") {
      return;
    }
    if (isAttacker && this.attacker) {
      this.attacker = {
        ...this.attacker,
        [option]: {
          ...this.attacker[option],
          [option2]: value,
        },
      };
      return;
    }
    if (!isAttacker && this.opponent) {
      this.opponent = {
        ...this.opponent,
        [option]: {
          ...this.opponent[option],
          [option2]: value,
        },
      };
    }
  };
}

export default PokedamStore;
