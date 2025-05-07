import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { videosRouter } from './routes/videos/index.js'
import { usersRouter } from './routes/users.js'
import { newsletterRouter } from './routes/newsletter.js'
import { categoriesRouter } from './routes/categories.js'
import { plansRouter } from './routes/plans.js'
import { pagesRouter } from './routes/pages.js'
import { configRouter } from './routes/config.js'
import { postsRouter } from './routes/posts.js'
import { searchRouter } from './routes/search.js'
import { paymentsRouter } from './routes/payments.js'
import { authRouter } from './routes/auth.js'
import { auth } from './middlewares/auth.js'

dotenv.config()

const app = express()

app.use(
  express.json(),
  cookieParser(),
  cors({
    origin: ['http://localhost:5173', 'https://vivatdah.com'],
    credentials: true,
  })
)

app.use(
  '/v1',
  configRouter,
  authRouter,
  plansRouter,
  pagesRouter,
  postsRouter,
  newsletterRouter,
  paymentsRouter
) // No auth

app.use('/v1', auth, usersRouter, videosRouter, categoriesRouter, searchRouter)

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`)
})
