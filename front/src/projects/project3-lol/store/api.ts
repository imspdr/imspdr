import axios from "axios";

const BASEURL = "/back/riot";

export const RiotAPI = {
  getPUUID: async (name: string) => {
    const puuid = await axios({
      method: "get",
      url: BASEURL + `/${encodeURIComponent(name)}`,
    })
      .then((data: any) => {
        return data.data?.puuid ? data.data.puuid : "";
      })
      .catch((e) => `error ${e}`);
    return {
      puuid: puuid,
      name: encodeURIComponent(name),
    };
  },
};
