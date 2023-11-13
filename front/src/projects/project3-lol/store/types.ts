type game = {
  win: boolean;
  champ: string;
};

type most = {
  champ: string;
  winRate: number;
  playTime: number;
};

export type lolUser = {
  id: number;
  name: string;
  lastGames: game[];
  mosts: most[];
};
