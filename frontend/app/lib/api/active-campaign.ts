import axios from "axios";

export async function sendContact(email: string) {
  return await axios
    .post(`${import.meta.env.VITE_API_URL}/active-campaign`, {
      email,
    })
    .then((res) => res.data);
}
