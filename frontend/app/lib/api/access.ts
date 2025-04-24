import axios from "axios";
import type { Category } from "~/types";

export async function getUserAllowedCategories(
  email: string | undefined
): Promise<Category[]> {
  if (!email) return [];

  return await axios
    .get(`${import.meta.env.VITE_API_URL}/metadata/access?email=${email}`)
    .then((res) => res?.data);
}
