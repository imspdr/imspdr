export type unionVal = {
  rank: string;
  num: number;
};

export type jobUnion = {
  job: string;
  values: unionVal[];
};
export const JOBS = ["전사", "마법사", "궁수", "도적", "해적", "제논"];
export const RANK = ["B", "A", "S", "SS", "SSS"];
