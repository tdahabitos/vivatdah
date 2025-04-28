import axios from "axios";
import type { FindArgs, FindGlobalArgs } from "payload";

export { getPublicUser, privateAuthCheck } from "./public";
export { addView, getViews } from "./views";
export { getComments, sendComment, deleteComment } from "./comments";
export { getFeedback, sendFeedback } from "./feedback";
export { getSaved, sendSaved } from "./saved";
export { getUserAllowedCategories } from "./access";

export default async function api(args: FindArgs) {
  return await axios
    .post(import.meta.env.VITE_API_URL, args)
    .then((res) => res.data);
}

export async function globalApi(args: FindGlobalArgs) {
  return await axios
    .post(`${import.meta.env.VITE_API_URL}/global`, args)
    .then((res) => res.data);
}

export const apiFetcher = (url: string) =>
  axios.get(`${import.meta.env.VITE_API_2_URL}${url}`).then((res) => res.data);
