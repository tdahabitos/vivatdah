import axios from "axios";

export const apiFetcher = async (url: string) => {
  return await axios
    .get(`/api/${url}/`)
    .then((res) => (res.data.docs ? res.data.docs : res.data))
    .catch((err) => console.log(err));
};
