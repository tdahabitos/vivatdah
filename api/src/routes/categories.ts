import express from 'express'
import axios from 'axios'
import qs from 'qs'
import { Category } from '@/types'

export const categoriesRouter = express.Router()

categoriesRouter.get('/categories', async (req, res) => {
  const { free_content } = req.query

  const query = qs.stringify({
    where: {
      status: {
        equals: 'published',
      },
      free_content: { equals: free_content === 'true' },
    },
  })

  const categories = await axios
    .get(`${process.env.CMS_API_URL}/categories?${query}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs)

  res
    .status(200)
    .json(
      categories.sort((a: Category, b: Category) =>
        a.title.localeCompare(b.title)
      )
    )
})

categoriesRouter.get('/categories/:id', async (req, res) => {
  const { id } = req.params

  const query = qs.stringify({
    where: {
      status: {
        equals: 'published',
      },
      id: {
        equals: id,
      },
    },
  })

  const category = await axios
    .get(`${process.env.CMS_API_URL}/categories?${query}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs[0])

  res.status(200).json(category)
})

categoriesRouter.get('/categories/:id/media', async (req, res) => {
  const { id } = req.params

  const query = qs.stringify({
    where: {
      is_public: {
        equals: true,
      },
      categories: {
        contains: id,
      },
    },
  })

  const media = await axios
    .get(`${process.env.CMS_API_URL}/media?${query}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs)

  res.status(200).json(media)
})
