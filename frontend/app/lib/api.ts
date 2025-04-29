import axios from "axios";
import { supabase } from "./supabase";

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: await supabase.auth
      .getSession()
      .then((res) => res.data.session?.access_token),
  },
  withCredentials: false,
});

export const apiFetcher = async (url: string) =>
  await fetcher.get(url).then((res) => res.data);

export async function addView(id: string) {
  return await fetcher.patch(`/videos/${id}/views`).then((res) => res.data);
}

export async function sendComment(id: string) {
  return await fetcher.post(`/videos/${id}/comments`).then((res) => res.data);
}
