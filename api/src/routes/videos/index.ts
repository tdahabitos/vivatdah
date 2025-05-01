import express from 'express'
import axios from 'axios'
import qs from 'qs'
import { getFolderVideos, getVideo, getVideos } from './functions'
import { auth } from '@/middlewares/auth'

export const videosRouter = express.Router()

/* === videos */
videosRouter.get('/videos', async (req, res) => {
  const { folder_id, page, limit } = req.query

  const videos = await getVideos(
    folder_id as string,
    page as string,
    limit as string
  )

  res.status(200).json(videos)
})

videosRouter.get('/videos/:id', async (req, res) => {
  const { id } = req.params
  const video = await getVideo(id)

  res.status(200).json(video)
})

videosRouter.get('/videos/folder/:id', async (req, res) => {
  const { id } = req.params
  const videos = await getFolderVideos(id)

  res.status(200).json(videos)
})

/* === list */
videosRouter.get('/videos/list/trending', async (req, res) => {
  const { page, limit } = req.query

  const query = qs.stringify({
    sort: ['-views'],
    page: page || 1,
    limit: limit || 16,
  })

  const list = await axios
    .get(`${process.env.CMS_API_URL}/views?${query}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs)

  res.status(200).json(list)
})

videosRouter.get('/videos/list/saved', async (req, res) => {
  const { user_id, page, limit } = req.query

  const query = qs.stringify({
    where: {
      user_id: {
        equals: user_id,
      },
    },
    page: page || 1,
    limit: limit || 999,
  })

  const list = await axios
    .get(`${process.env.CMS_API_URL}/saved?${query}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs)

  res.status(200).json(list)
})

/* === views */
videosRouter.get('/videos/:id/views', async (req, res) => {
  const { id } = req.params

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
    },
  })

  const views = await axios
    .get(`${process.env.CMS_API_URL}/views?${query}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs[0].views)
    .catch(() => 0)

  res.status(200).json(views)
})

videosRouter.patch('/videos/:id/views', async (req, res) => {
  const { id } = req.params

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
    },
  })

  const currentViews = await axios
    .get(`${process.env.CMS_API_URL}/views?${query}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs?.[0]?.views || null)

  const views = await axios({
    method: currentViews ? 'patch' : 'post',
    url: currentViews
      ? `${process.env.CMS_API_URL}/views?${query}`
      : `${process.env.CMS_API_URL}/views`,
    headers: {
      accept: 'application/json',
      Authorization: process.env.CMS_API_KEY,
    },
    data: {
      video_id: id,
      views: currentViews ? currentViews + 1 : 1,
    },
  }).then((res) => res.data.docs?.[0]?.views)

  res.status(200).json(views)
})

/* === comments */
videosRouter.get('/videos/:id/comments', async (req, res) => {
  const { id } = req.params

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
    },
    sort: ['-createdAt'],
    pagination: {
      page: 1,
      pageSize: 999,
    },
  })

  const comments = await axios
    .get(`${process.env.CMS_API_URL}/comments?${query}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs)

  res.status(200).json(comments)
})

videosRouter.post('/videos/:id/comments', async (req, res) => {
  const { id } = req.params
  const { user_id, comment } = req.body

  const newComment = await axios
    .post(
      `${process.env.CMS_API_URL}/comments`,
      {
        video_id: id,
        user_id,
        comment,
      },
      {
        headers: {
          accept: 'application/json',
          Authorization: process.env.CMS_API_KEY,
        },
      }
    )
    .then((res) => res.data.doc)

  res.status(200).json(newComment)
})

videosRouter.delete('videos/comments/:id', async (req, res) => {
  const { id } = req.params

  const query = qs.stringify({
    where: {
      id: {
        equals: id,
      },
    },
  })

  await axios.delete(`${process.env.CMS_API_URL}/comments?${query}`, {
    headers: {
      accept: 'application/json',
      Authorization: process.env.CMS_API_KEY,
    },
  })

  res.status(200).json('deleted')
})

/* === saved */
videosRouter.get('/videos/:id/saved', auth, async (req, res) => {
  const { id } = req.params

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
      user_id: {
        equals: req.user_id,
      },
    },
    limit: 1,
    page: 1,
  })

  const saved = await axios
    .get(`${process.env.CMS_API_URL}/saved?${query}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs)

  res.status(200).json(saved.length > 0)
})

videosRouter.post('/videos/:id/saved', auth, async (req, res) => {
  const { id } = req.params

  const saved = await axios
    .post(
      `${process.env.CMS_API_URL}/saved`,
      {
        video_id: id,
        user_id: req.user_id,
      },
      {
        headers: {
          accept: 'application/json',
          Authorization: process.env.CMS_API_KEY,
        },
      }
    )
    .then((res) => res.data.doc)

  res.status(200).json(saved)
})

videosRouter.delete('/videos/:id/saved', auth, async (req, res) => {
  const { id } = req.params

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
      user_id: {
        equals: req.user_id,
      },
    },
  })

  await axios.delete(`${process.env.CMS_API_URL}/saved?${query}`, {
    headers: {
      accept: 'application/json',
      Authorization: process.env.CMS_API_KEY,
    },
  })

  res.status(200).json('deleted')
})

/* === feedback */
videosRouter.get('/videos/:id/feedback', auth, async (req, res) => {
  const { id } = req.params

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
      user_id: {
        equals: req.user_id,
      },
    },
    limit: 1,
    page: 1,
  })

  const feedback = await axios
    .get(`${process.env.CMS_API_URL}/feedback?${query}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs?.[0]?.type || null)

  res.status(200).json(feedback)
})

videosRouter.get('/videos/:id/feedback/positive', auth, async (req, res) => {
  const { id } = req.params

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
      type: {
        equals: 'positive',
      },
    },
    limit: 1,
    page: 1,
  })

  const count = await axios
    .get(`${process.env.CMS_API_URL}/feedback?${query}`, {
      headers: {
        accept: 'application/json',
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.totalDocs)
    .catch(() => 0)

  res.status(200).json(count)
})

videosRouter.post('/videos/:id/feedback', auth, async (req, res) => {
  const { id } = req.params
  const { type } = req.body

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
      user_id: {
        equals: req.user_id,
      },
    },
  })

  await axios.delete(`${process.env.CMS_API_URL}/feedback?${query}`, {
    headers: {
      accept: 'application/json',
      Authorization: process.env.CMS_API_KEY,
    },
  })

  if (!type) {
    res.status(200).json(null)
  }

  const feedback = await axios
    .post(
      `${process.env.CMS_API_URL}/feedback`,
      {
        video_id: id,
        user_id: req.user_id,
        type,
      },
      {
        headers: {
          accept: 'application/json',
          Authorization: process.env.CMS_API_KEY,
        },
      }
    )
    .then((res) => res.data.doc)

  res.status(200).json(feedback)
})
