import axios from "axios";

export async function getSaved(video_id: string, user_id: string) {
  return await axios
    .get(
      `${
        import.meta.env.VITE_API_URL
      }/metadata/saved?video_id=${video_id}&user_id=${user_id}`
    )
    .then((res) => res?.data);
}

export async function sendSaved(
  video_id: string,
  user_id: string,
  action: "save" | "unsave"
) {
  return await axios
    .post(`${import.meta.env.VITE_API_URL}/metadata/saved`, {
      video_id,
      user_id,
      action,
    })
    .then((res) => res?.data);
}
