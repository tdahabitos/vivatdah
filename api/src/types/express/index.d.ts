import { Request } from 'express'

declare global {
  namespace Express {
    interface Request {
      userId?: string
      cookies: {
        vivatdah_access_token?: string
        vivatdah_refresh_token?: string
      }
    }
  }
}
