import { NextFunction, Request, Response } from 'express'
import { errorMessages } from '../utils/error-messages.js'
import { supabase } from '@/lib/supabase.js'

export async function auth(req: Request, res: Response, next: NextFunction) {
  const access_token = req.cookies.vivatdah_access_token
  const refresh_token = req.cookies.vivatdah_refresh_token

  if (!access_token || !refresh_token) {
    res.status(401).json({ message: errorMessages[401] })
    next()
  }

  const { data, error } = await supabase().auth.getUser(access_token)

  if (error) {
    const { data, error } = await supabase().auth.refreshSession({
      refresh_token: refresh_token,
    })

    if (error) {
      res.status(403).json({ message: errorMessages[403] })
      next()
    }

    req.userId = data.user?.id
    next()
  }

  req.userId = data.user?.id

  next()
}
