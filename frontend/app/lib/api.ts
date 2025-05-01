import axios from "axios";

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  withCredentials: false,
});

export const apiFetcher = async (url: string) =>
  await fetcher.get(url).then((res) => res.data);

export async function addView(id: string) {
  return await fetcher.patch(`/videos/${id}/views`).then((res) => res.data);
}

/* Comment */
export async function sendComment(id: string) {
  return await fetcher.post(`/videos/${id}/comments`).then((res) => res.data);
}

/* Save */
export async function saveVideo(id: string) {
  return await fetcher.post(`/videos/${id}/saved`);
}

export async function unsaveVideo(id: string) {
  return await fetcher.delete(`/videos/${id}/saved`);
}
