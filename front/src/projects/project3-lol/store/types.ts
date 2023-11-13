type game = {
  kill: number;
  death: number;
  assist: number;
  win: number;
  championName: string;
};

type most = {
  champ: number;
  point: number;
};

export type lolUser = {
  id: number;
  name: string;
  lastGames: game[];
  mosts: most[];
};
