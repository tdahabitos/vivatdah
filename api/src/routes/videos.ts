import express from "express";
import { auth } from "@/middlewares/auth";
import axios from "axios";
import { PandaVideo } from "@/types";

export const videosRouter = express.Router();

videosRouter.get("/videos", async (req, res) => {
  const { folder_id, page, limit } = req.query;

  const videos = await axios
    .get("https://api-v2.pandavideo.com.br/videos", {
      params: {
        folder_id,
        page,
        limit,
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
