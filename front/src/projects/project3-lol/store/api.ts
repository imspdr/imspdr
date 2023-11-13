import axios from "axios";
import { lolUser } from "./types";

const BASEURL = "/back/riot";

export const RiotAPI = {
  getPUUID: async (name: string) => {
    const ret = await axios({
      method: "get",
      url: BASEURL + `/${encodeURIComponent(name)}`,
    })
      .then((data: any) => {
        return data.data;
      })
      .catch((e) => undefined);

    return ret;
  },
};
