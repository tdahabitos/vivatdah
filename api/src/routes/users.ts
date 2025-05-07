import express from 'express'
import axios from 'axios'
import QueryString from 'qs'
import { Category } from '@/types'
import { supabase } from '@/lib/supabase'
import { errorMessages } from '@/utils/error-messages'

export const usersRouter = express.Router()

usersRouter.get('/users/me', async (req, res) => {
  const {
    data: { user },
    error,
  } = await supabase().auth.getUser(req.cookies.vivatdah_access_token)

  if (error) {
    console.log(error)
    res.status(401).json(errorMessages[401])
  }

  res.status(200).json(user)
})

usersRouter.get('/users/auth-check', async (req, res) => {
  const { email } = req.query

  if (!email) {
    res.status(200).json(false)
    return
  }

  const auth = await axios
    .get(`${process.env.CMS_API_URL}/globals/authentication`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data)

  if (!auth.auth_private_mode) {
    res.status(200).json(true)
    return
  }

  res.status(200).json(
    auth.auth_allowed_user_emails
      .replace(/\s/g, '')
      .split(',')
      .map((email: string) => email.toLowerCase())
      .includes((email as string).toLowerCase())
  )
})

usersRouter.get('/users/access/allowed-categories', async (req, res) => {
  const { email } = req.query

  const query = QueryString.stringify({
    where: {
      email: {
        equals: email,
      },
    },
  })

  const allowedCategories = await axios
    .get(`${process.env.CMS_API_URL}/access?${query}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) =>
      res.data.docs[0].allowed_categories.map((c: Category) => c.id)
    )
    .catch(() => [])

  res.status(200).json(allowedCategories)
})
