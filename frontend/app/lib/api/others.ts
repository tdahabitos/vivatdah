import axios from "axios";
import type { PublicUser } from "~/types";

export async function getPublicUser(userId: string): Promise<PublicUser> {
  return await axios
    .get(`${import.meta.env.VITE_API_URL}/public/users/${userId}`)
    .then((res) => res.data);
}
