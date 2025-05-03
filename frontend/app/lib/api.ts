import axios from 'axios'
import type { FeedbackType } from '~/types'
import { supabase } from './supabase'

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  withCredentials: false,
})

export const apiFetcher = async (url: string) =>
  await fetcher.get(url).then((res) => res.data)

/* Views */
export async function addView(id: string) {
  return await fetcher.patch(`/videos/${id}/views`).then((res) => res.data)
}

/* Feedback */
export async function sendVideoFeedback(id: string, type: FeedbackType) {
  return await fetcher
    .post(`/videos/${id}/feedback`, { type })
    .then((res) => res.data)
}

/* Comment */
export async function sendComment(id: string, comment: string) {
  return await fetcher
    .post(`/videos/${id}/comments`, { comment })
    .then((res) => res.data)
}

export async function deleteComment(id: string) {
  return await fetcher.delete(`/videos/${id}/comments`).then((res) => res.data)
}

/* Save */
export async function saveVideo(id: string) {
  return await fetcher.post(`/videos/${id}/saved`)
}

export async function unsaveVideo(id: string) {
  return await fetcher.delete(`/videos/${id}/saved`)
}

/* Checkout */
export async function getCheckoutUrl(plan_id: string) {
  const user = await supabase.auth.getUser().then((res) => res.data.user)

  return await fetcher
    .post('payments', {
      plan_id,
      user: {
        full_name: user?.user_metadata.full_name,
        email: user?.email,
      },
    })
    .then((res) => res.data)
}

/* Newsletter */
export async function addNewsletterContact(email: string) {
  console.log(email)
  return await fetcher.post('/newsletter', { email }).then((res) => res.data)
}
