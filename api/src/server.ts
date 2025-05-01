import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
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

dotenv.config()

const app = express()
const allowedOrigins = ['http://localhost:5173', 'https://vivatdah.com']

app.use(
  express.json(),
  cors({
    origin: '*',
    /* origin: (origin, callback) =>
      origin && allowedOrigins.includes(origin)
        ? callback(null, true)
        : callback(new Error("Not allowed by CORS")), */
    credentials: true,
  })
)

app.use(
  '/v1',
  configRouter,
  usersRouter,
  videosRouter,
  newsletterRouter,
  categoriesRouter,
  plansRouter,
  pagesRouter,
  postsRouter,
  searchRouter,
  paymentsRouter
)

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`)
})
