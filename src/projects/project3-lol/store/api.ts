import axios from "axios";

const BASEURL = "http://localhost:4545/riot";

const APIkey = "RGAPI-3abf2df7-5e47-402c-b0d0-021c1744cf04";

export const RiotAPI = {
  getPUUID: async (name: string) => {
    const puuid = await axios({
      method: "get",
      url: BASEURL + `/lol/summoner/v4/summoners/by-name/${name}`,
      headers: {
        "X-Riot-Token": APIkey,
      },
    })
      .then((data: any) => {
        return data.puuid ? data.puuid : "";
      })
      .catch((e) => `error ${e}`);
    return {
      puuid: puuid,
      name: encodeURIComponent(name),
    };
  },
};
