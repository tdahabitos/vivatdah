import axios from "axios";

export async function getViews(video_id: string): Promise<number> {
  return await axios
    .get(`${import.meta.env.VITE_API_URL}/metadata/views?video_id=${video_id}`)
    .then((res) => res?.data);
}

export async function addView(video_id: string): Promise<number> {
  return await axios
    .post(`${import.meta.env.VITE_API_URL}/metadata/views`, { video_id })
    .then((res) => res?.data?.result);
}
