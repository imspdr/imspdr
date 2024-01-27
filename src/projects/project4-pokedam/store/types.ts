export type habcds = {
  h: number;
  a: number;
  b: number;
  c: number;
  d: number;
  s: number;
};
export type lang = {
  english: string;
  japanese: string;
  korean: string;
};
export type pokemonSpecies = {
  pokemonName: lang;
  pokemonStat: habcds;
  pokemonType: string[];
};
export type pokemon = {
  title: string;
  feature: habcds;
  individual: habcds;
  effort: habcds;
  rank: habcds;
  real: habcds;
} & pokemonSpecies;
