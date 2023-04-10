import Axios from "axios";
import { Card, Options, Response } from "./resources";

const axios = Axios.create({
  baseURL: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
});

async function getMany(options?: Options): Promise<Response<Card[]>> {
  const {
    num = 10,
    offset = 0,
    fname = "",
    level = "",
    sort,
    order = "asc",
    attribute,
  } = options || {};
  const _level = level ? (level === "no-level" ? "" : level) : undefined;
  const { data } = await axios.get<Response<Card[]>>("/", {
    params: {
      attribute: attribute || undefined,
      desc: fname,
      fname,
      level: _level,
      num,
      offset,
      sort,
      sortorder: order,
      taple: "yes",
    },
  });

  return data;
}

async function getById(id: string): Promise<Card> {
  const { data } = await axios.get<Response<Card[]>>("/", { params: { id } });
  if (!Array.isArray(data?.data)) throw new Error("Invalid response");
  return data.data[0];
}

const cardsService = {
  getMany,
  getById,
};

export default cardsService;
