import axios from "axios";
import type { Feedback } from "~/types";

export async function getFeedback(video_id: string, user_id: string) {
  return await axios
    .get(
      `${
        import.meta.env.VITE_API_URL
      }/metadata/feedback?video_id=${video_id}&user_id=${user_id}`
    )
    .then((res) => res.data);
}

export async function sendFeedback(
  video_id: string,
  user_id: string,
  type: Feedback
) {
  return await axios
    .post(`${import.meta.env.VITE_API_URL}/metadata/feedback`, {
      video_id,
      user_id,
      type,
    })
    .then((res) => res.data);
}
