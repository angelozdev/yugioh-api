import Axios from "axios";
import { Card, Options, Response } from "./resources";

const axios = Axios.create({
  baseURL: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
});

export async function getAll(options?: Options): Promise<Response<Card[]>> {
  const { num = 10, offset = 0, fname = "" } = options || {};
  const { data } = await axios.get<Response<Card[]>>("/", {
    params: { num, offset, taple: "yes", fname },
  });

  return data;
}

export async function getById(id: string): Promise<Card> {
  const { data } = await axios.get<Response<Card[]>>("/", { params: { id } });
  if (!Array.isArray(data?.data)) throw new Error("Invalid response");
  return data.data[0];
}

const exportedFunctions = { getAll, getById };
export default exportedFunctions;
