import axios from "axios";
import { lolUser } from "./types";

const BASEURL = "/back/riot";

export const RiotAPI = {
  getUserInfo: async (name: string) => {
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
  updateToken: async (token: string, password: string) => {
    const ret = await axios({
      method: "post",
      url: BASEURL + `/updateKey`,
      params: {
        token: token,
        password: password,
      },
    })
      .then((data: any) => {
        return data.data;
      })
      .catch(() => undefined);
    return ret;
  },
};

