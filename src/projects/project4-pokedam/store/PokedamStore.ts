import { makeAutoObservable, runInAction } from "mobx";
import { pokemon, habcds, pokemonSpecies } from "./types";
import pokemons from "./pokedex2.json";

const zeros: habcds = {
  h: 0,
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  s: 0,
};

const ones: habcds = {
  h: 1,
  a: 1,
  b: 1,
  c: 1,
  d: 1,
  s: 1,
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

    if (localStorage.getItem("pokedam-history")) {
      this.__history = JSON.parse(localStorage.getItem("pokedam-history")!);
    } else {
      this.__history = [];
    }
    this.__attacker = {
      title: "",
      individual: indi31,
      feature: ones,
      effort: zeros,
      rank: zeros,
      real: zeros,
      ...sampleSpecies,
    };
    this.__opponent = {
      title: "",
      individual: indi31,
      feature: ones,
      effort: zeros,
      rank: zeros,
      real: zeros,
      ...sampleSpecies,
    };

    this.attacker = this.calcReal(this.attacker);
    this.opponent = this.calcReal(this.opponent);
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
    this.__attacker = this.calcReal(poke);
  }
  set opponent(poke: pokemon) {
    this.__opponent = this.calcReal(poke);
  }
  set history(pokes: pokemon[]) {
    this.__history = pokes;
    localStorage.setItem("pokedam-history", JSON.stringify(pokes));
  }
  switchPoke = () => {
    let temp: pokemon = this.opponent;
    this.opponent = this.attacker;
    this.attacker = temp;
  };
  setPoke = (isAttacker: boolean, poke: pokemon) => {
    if (isAttacker) {
      this.attacker = poke;
    } else {
      this.opponent = poke;
    }
  };
  savePoke = (isAttacker: boolean) => {
    const genTitle = (poke: pokemon) => {
      let pokename = poke.pokemonName.korean ? poke.pokemonName.korean : poke.pokemonName.english;
      pokename += " ";
      Object.keys(poke.effort).forEach((key) => {
        const ke = poke.effort[key as keyof habcds];
        if (ke) {
          pokename += key;
        }
      });
      return pokename.slice(0, 10);
    };
    this.history = [
      isAttacker
        ? { ...this.attacker, title: genTitle(this.attacker) }
        : { ...this.opponent, title: genTitle(this.opponent) },
      ...this.history,
    ];
  };
  calcReal = (poke: pokemon): pokemon => {
    return {
      ...poke,
      real: {
        h: Math.floor((poke.pokemonStat.h * 2 + poke.individual.h + poke.effort.h / 4) / 2 + 60),
        a: Math.floor(
          Math.floor(
            ((poke.pokemonStat.a * 2 + poke.individual.a + poke.effort.a / 4) / 2 + 5) *
              poke.feature.a
          ) * (poke.rank.a >= 0 ? (poke.rank.a + 2) / 2 : 2 / (2 + poke.rank.a))
        ),
        b: Math.floor(
          Math.floor(
            ((poke.pokemonStat.b * 2 + poke.individual.b + poke.effort.b / 4) / 2 + 5) *
              poke.feature.b
          ) * (poke.rank.b >= 0 ? (poke.rank.b + 2) / 2 : 2 / (2 + poke.rank.b))
        ),
        c: Math.floor(
          Math.floor(
            ((poke.pokemonStat.c * 2 + poke.individual.c + poke.effort.c / 4) / 2 + 5) *
              poke.feature.c
          ) * (poke.rank.c >= 0 ? (poke.rank.c + 2) / 2 : 2 / (2 + poke.rank.c))
        ),
        d: Math.floor(
          Math.floor(
            ((poke.pokemonStat.d * 2 + poke.individual.d + poke.effort.d / 4) / 2 + 5) *
              poke.feature.d
          ) * (poke.rank.d >= 0 ? (poke.rank.d + 2) / 2 : 2 / (2 + poke.rank.d))
        ),
        s: Math.floor(
          Math.floor(
            ((poke.pokemonStat.s * 2 + poke.individual.s + poke.effort.s / 4) / 2 + 5) *
              poke.feature.s
          ) * (poke.rank.s >= 0 ? (poke.rank.s + 2) / 2 : 2 / (2 + poke.rank.s))
        ),
      },
    };
  };
  setFeature = (isAttacker: boolean, option2: keyof habcds) => {
    if (option2 === "h") return;
    if (isAttacker && this.attacker) {
      this.attacker = {
        ...this.attacker,
        feature: {
          ...this.attacker.feature,
          [option2]:
            this.attacker.feature[option2] > 1 ? 0.9 : this.attacker.feature[option2] + 0.1,
        },
      };
      return;
    }
    if (!isAttacker && this.opponent) {
      this.opponent = {
        ...this.opponent,
        feature: {
          ...this.opponent.feature,
          [option2]:
            this.opponent.feature[option2] > 1 ? 0.9 : this.opponent.feature[option2] + 0.1,
        },
      };
    }
  };
  setOption = (
    isAttacker: boolean,
    option: keyof pokemon,
    option2: keyof habcds,
    value: number
  ) => {
    if (option === "pokemonType" || option === "title" || option === "pokemonName") {
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
