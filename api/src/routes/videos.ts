import express from "express";
import axios from "axios";
import { PandaVideo } from "@/types";
import qs from "qs";

export const videosRouter = express.Router();

/* === videos */
videosRouter.get("/videos", async (req, res) => {
  const { folder_id, page, limit } = req.query;

  const videos = await axios
    .get("https://api-v2.pandavideo.com.br/videos", {
      params: {
        folder_id,
        page: page || 1,
        limit: limit || 999,
      },
      headers: {
        accept: "application/json",
        Authorization: process.env.PANDA_API_KEY,
      },
    })
    .then((res) => res.data.videos);

  res.status(200).json(videos);
});

videosRouter.get("/videos/:id", async (req, res) => {
  const { id } = req.params;

  const video = await axios
    .get(`https://api-v2.pandavideo.com.br/videos/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.PANDA_API_KEY,
      },
    })
    .then((res) => res.data);

  const related = await axios
    .get("https://api-v2.pandavideo.com.br/videos", {
      params: {
        page: 1,
        limit: 8,
      },
      headers: {
        accept: "application/json",
        Authorization: process.env.PANDA_API_KEY,
      },
    })
    .then((res) => res.data.videos);

  res.status(200).json({
    ...video,
    related: related.filter((video: PandaVideo) => video.id !== id),
  });
});

/* === list */
videosRouter.get("/videos/list/trending", async (req, res) => {
  const { page, limit } = req.query;

  const query = qs.stringify({
    sort: "-views",
    page: page || 1,
    limit: limit || 16,
  });

  const list = await axios
    .get(`${process.env.CMS_API_URL}/views?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs);

  res.status(200).json(list);
});

videosRouter.get("/videos/list/saved", async (req, res) => {
  const { user_id, page, limit } = req.query;

  const query = qs.stringify({
    where: {
      user_id: {
        equals: user_id,
      },
    },
    page: page || 1,
    limit: limit || 999,
  });

  const list = await axios
    .get(`${process.env.CMS_API_URL}/saved?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs);

  res.status(200).json(list);
});

/* === views */
videosRouter.get("/videos/:id/views", async (req, res) => {
  const { id } = req.params;

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
    },
  });

  const views = await axios
    .get(`${process.env.CMS_API_URL}/views?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs[0].views || 0);

  res.status(200).json(views);
});

videosRouter.patch("/videos/:id/views", async (req, res) => {
  const { id } = req.params;

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
    },
  });

  const currentViews = await axios
    .get(`${process.env.CMS_API_URL}/views?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs[0].views || 0);

  const views = await axios({
    method: currentViews ? "PATCH" : "POST",
    url: `${process.env.CMS_API_URL}/views?${query}`,
    data: {
      views: currentViews ? currentViews + 1 : 1,
    },
    headers: {
      accept: "application/json",
      Authorization: process.env.CMS_API_KEY,
    },
  }).then((res) => res.data.docs[0].views || 0);

  res.status(200).json(views);
});

/* === comments */
videosRouter.get("/videos/:id/comments", async (req, res) => {
  const { id } = req.params;

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
    },
    sort: ["-createdAt"],
    pagination: {
      page: 1,
      pageSize: 999,
    },
  });

  const comments = await axios
    .get(`${process.env.CMS_API_URL}/comments?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs);

  res.status(200).json(comments);
});

videosRouter.post("/videos/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { user_id, comment } = req.body;

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
          accept: "application/json",
          Authorization: process.env.CMS_API_KEY,
        },
      }
    )
    .then((res) => res.data.doc);

  res.status(200).json(newComment);
});

videosRouter.delete("videos/comments/:id", async (req, res) => {
  const { id } = req.params;

  const query = qs.stringify({
    where: {
      id: {
        equals: id,
      },
    },
  });

  await axios.delete(`${process.env.CMS_API_URL}/comments?${query}`, {
    headers: {
      accept: "application/json",
      Authorization: process.env.CMS_API_KEY,
    },
  });

  res.status(200).json("deleted");
});

/* === saved */
videosRouter.get("/videos/:id/saved", async (req, res) => {
  const { id } = req.params;

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
    },
    limit: 1,
    page: 1,
  });

  const saved = await axios
    .get(`${process.env.CMS_API_URL}/saved?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs);

  res.status(200).json(saved.length > 0);
});

videosRouter.post("/videos/:id/saved", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  const saved = await axios
    .post(
      `${process.env.CMS_API_URL}/saved`,
      {
        video_id: id,
        user_id,
      },
      {
        headers: {
          accept: "application/json",
          Authorization: process.env.CMS_API_KEY,
        },
      }
    )
    .then((res) => res.data.doc);

  res.status(200).json(saved);
});

videosRouter.delete("/videos/:id/saved", async (req, res) => {
  const { id } = req.params;

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
    },
  });

  await axios.delete(`${process.env.CMS_API_URL}/saved?${query}`, {
    headers: {
      accept: "application/json",
      Authorization: process.env.CMS_API_KEY,
    },
  });

  res.status(200).json("deleted");
});

/* === feedback */
videosRouter.get("/videos/:id/feedback", async (req, res) => {
  const { id } = req.params;

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
    },
    limit: 1,
    page: 1,
  });

  const feedback = await axios
    .get(`${process.env.CMS_API_URL}/feedback?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs[0].type)
    .catch(() => null);

  res.status(200).json(feedback);
});

videosRouter.post("/videos/:id/feedback", async (req, res) => {
  const { id } = req.params;
  const { user_id, type } = req.body;

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
    },
  });

  await axios.delete(`${process.env.CMS_API_URL}/feedback?${query}`, {
    headers: {
      accept: "application/json",
      Authorization: process.env.CMS_API_KEY,
    },
  });

  const feedback = await axios
    .post(
      `${process.env.CMS_API_URL}/feedback`,
      {
        video_id: id,
        user_id,
        type,
      },
      {
        headers: {
          accept: "application/json",
          Authorization: process.env.CMS_API_KEY,
        },
      }
    )
    .then((res) => res.data.doc);

  res.status(200).json(feedback);
});

videosRouter.delete("/videos/:id/feedback", async (req, res) => {
  const { id } = req.params;

  const query = qs.stringify({
    where: {
      video_id: {
        equals: id,
      },
    },
  });

  await axios.delete(`${process.env.CMS_API_URL}/feedback?${query}`, {
    headers: {
      accept: "application/json",
      Authorization: process.env.CMS_API_KEY,
    },
  });

  res.status(200).json("deleted");
});
