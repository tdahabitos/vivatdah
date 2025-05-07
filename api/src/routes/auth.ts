import express from 'express'
import { supabase } from '@/lib/supabase'
import { auth } from '@/middlewares/auth'
import { errorMessages } from '@/utils/error-messages'

export const authRouter = express.Router()

authRouter.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body

  const { data, error } = await supabase().auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    res.status(404).json(errorMessages[404])
  }

  res.cookie('vivatdah_access_token', data.session?.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: 'lax',
    maxAge: 3600000,
  })

  res.cookie('vivatdah_refresh_token', data.session?.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: 'lax',
    maxAge: 3600000,
  })

  res.status(200).json(data.user)
})

authRouter.post('/auth/signup', async (req, res) => {
  const { name, email, password } = req.body

  const { data, error } = await supabase().auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  })

  if (error) {
    res.status(409).json(errorMessages[409])
  }

  res.status(200).json(data.user)
})

authRouter.post('/auth/password-reset', async (req, res) => {
  const { email } = req.body

  const { data, error } = await supabase().auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.FRONTEND_URL}/auth/new-password`,
  })

  if (error) {
    res.status(403).json(errorMessages[403])
  }

  res.status(200).json(data)
})

authRouter.post('/auth/signout', async (_, res) => {
  const { error } = await supabase().auth.signOut()

  if (error) {
    res.status(200).json(null)
  }

  res.clearCookie('vivatdah_access_token')
  res.clearCookie('vivatdah_refresh_token')

  res.status(200).json(true)
})
