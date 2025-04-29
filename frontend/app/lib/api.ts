import axios from "axios";

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: `Bearer 111`,
  },
  withCredentials: false,
});

export const apiFetcher = async (url: string) =>
  await fetcher.get(url).then((res) => res.data);
