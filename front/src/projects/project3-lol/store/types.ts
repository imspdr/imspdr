export type game = {
  kill: number;
  death: number;
  assist: number;
  win: number;
  championName: string;
};

export type most = {
  champ: string;
  point: number;
};

export type tierInfo = {
  tier: string;
  rank: string;
  leaguePoints: number;
  queueType: string;
  wins: number;
  losses: number;
};
export type lolUser = {
  id: string;
  name: string;
  lastGames: game[];
  mosts: most[];
  tierList: tierInfo[];
};
