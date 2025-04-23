import axios from "axios";
import type { FindArgs, FindGlobalArgs } from "payload";

export { getPublicUser } from "./others";
export { addView, getViews } from "./views";
export { getComments, sendComment, deleteComment } from "./comments";
export { getFeedback, sendFeedback } from "./feedback";
export { getSaved, sendSaved } from "./saved";

export default async function api(args: FindArgs) {
  return await axios
    .post(import.meta.env.VITE_API_URL, args)
    .then((res) => res?.data?.result?.docs);
}

export async function globalCollectionApi(args: FindGlobalArgs) {
  return await axios
    .post(`${import.meta.env.VITE_API_URL}/global`, args)
    .then((res) => res?.data?.result);
}
