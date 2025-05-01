import express from 'express'
import axios from 'axios'
import qs from 'qs'
import { searchVideos } from './videos/functions'

export const searchRouter = express.Router()

searchRouter.get('/search', async (req, res) => {
  const { value } = req.query

  const videos = await searchVideos(value as string)

  const query = qs.stringify({
    where: {
      title: {
        contains: value,
      },
      is_public: {
        equals: true,
      },
    },
  })

  const files = await axios
    .get(`${process.env.CMS_API_URL}/media?${query}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs)

  res.status(200).json({
    videos,
    files,
  })
})
