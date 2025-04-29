import express from "express";
import axios from "axios";
import qs from "qs";

export const plansRouter = express.Router();

plansRouter.get("/plans", async (req, res) => {
  const query = qs.stringify({
    where: {
      status: {
        equals: "published",
      },
      show_at_home: {
        equals: true,
      },
    },
  });

  const categories = await axios
    .get(`${process.env.CMS_API_URL}/plans?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs);

  res.status(200).json(categories);
});
