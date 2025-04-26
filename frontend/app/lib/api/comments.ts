import axios from "axios";
import type { Comment } from "~/types";

export async function getComments(video_id: string): Promise<Comment[]> {
  return await axios
    .get(
      `${import.meta.env.VITE_API_URL}/metadata/comments?video_id=${video_id}`
    )
    .then((res) => res.data);
}

export async function sendComment(
  video_id: string,
  user_id: string,
  comment: string
) {
  return await axios
    .post(`${import.meta.env.VITE_API_URL}/metadata/comments`, {
      video_id,
      user_id,
      comment,
    })
    .then((res) => res.data);
}

export async function deleteComment(id: string) {
  return await axios
    .delete(`${import.meta.env.VITE_API_URL}/metadata/comments?id=${id}`)
    .then((res) => res.data);
}
