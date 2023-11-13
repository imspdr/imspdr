import axios from "axios";

const BASEURL = "/back";

const APIkey = "RGAPI-f54999ef-ecd9-4c80-bc1e-02670624a813";

export const RiotAPI = {
  getPUUID: async (name: string) => {
    const puuid = await axios({
      method: "get",
      url: BASEURL + `/lol/summoner/v4/summoners/by-name/${encodeURIComponent(name)}`,
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
