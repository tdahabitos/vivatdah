import axios from "axios";

export const apiFetcher = async (url: string) =>
  await axios.get(`${process.env.VITE_API_URL}${url}`).then((res) => res.data);
