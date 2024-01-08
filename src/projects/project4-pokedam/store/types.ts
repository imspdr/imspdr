export type habcds = {
  h: number;
  a: number;
  b: number;
  c: number;
  d: number;
  s: number;
};

export type pokemonSpecies = {
  pokemonName: string;
  species: habcds;
  pokemonType: number;
};
export type pokemon = {
  title: string;
  individual: habcds;
  effort: habcds;
  rank: habcds;
} & pokemonSpecies;
