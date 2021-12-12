import Axios from "axios";
import { Card, Options, Response } from "./resources";

const axios = Axios.create({
  baseURL: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
});

export async function getAll(options?: Options): Promise<Response<Card[]>> {
  const { num = 10, offset = 0 } = options || {};
  const { data } = await axios.get<Response<Card[]>>("/", {
    params: { num, offset, taple: "yes" },
  });
  return data;
}

export default { getAll };
