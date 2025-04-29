import express from "express";
import axios from "axios";

export const configRouter = express.Router();

configRouter.get("/config", async (req, res) => {
  const administration = await axios
    .get(`${process.env.CMS_API_URL}/globals/administration`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data);

  const banner = await axios
    .get(`${process.env.CMS_API_URL}/globals/banner`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data);

  res.status(200).json({
    administration,
    banner,
  });
});
