import axios from 'axios'

export const apiFetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  withCredentials: true,
})

export const api = async (url: string) =>
  await apiFetcher.get(url).then((res) => res.data)
