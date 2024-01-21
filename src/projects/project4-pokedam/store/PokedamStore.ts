import { makeAutoObservable, runInAction } from "mobx";
import { pokemon, habcds, pokemonSpecies } from "./types";
import pokemons from "./pokedex.json";

const zeros: habcds = {
  h: 0,
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  s: 0,
};

const indi31: habcds = {
  h: 31,
  a: 31,
  b: 31,
  c: 31,
  d: 31,
  s: 31,
};

const sampleSpecies: pokemonSpecies = {
  pokemonType: ["Grass", "Poison"],
  pokemonStat: { h: 45, a: 49, b: 49, c: 65, d: 65, s: 45 },
  pokemonName: { english: "Bulbasaur", japanese: "フシギダネ", korean: "이상해씨" },
};

class PokedamStore {
  private __attacker: pokemon;
  private __opponent: pokemon;
  private __history: pokemon[];
  public pokemonList: pokemonSpecies[];
  constructor() {
    this.pokemonList = pokemons;
    this.__history = [];
    this.__attacker = {
      index: 0,
      title: "",
      individual: indi31,
      effort: zeros,
      rank: zeros,
      real: zeros,
      ...sampleSpecies,
    };
    this.__opponent = {
      index: 0,
      title: "",
      individual: indi31,
      effort: zeros,
      rank: zeros,
      real: zeros,
      ...sampleSpecies,
    };
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
  set attacker(poke: pokemon) {
    this.__attacker = poke;
  }
  set opponent(poke: pokemon) {
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
    if (
      option === "pokemonType" ||
      option === "title" ||
      option === "index" ||
      option === "pokemonName"
    ) {
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
