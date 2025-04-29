import express from "express";
import axios from "axios";
import qs from "qs";

export const pagesRouter = express.Router();

pagesRouter.get("/pages", async (req, res) => {
  const query = qs.stringify({
    where: {
      status: {
        equals: "published",
      },
      show_at_home: {
        equals: true,
      },
      sort: ["order"],
    },
  });

  const categories = await axios
    .get(`${process.env.CMS_API_URL}/pages?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs);

  res.status(200).json(categories);
});

pagesRouter.get("/pages/:id", async (req, res) => {
  const { id } = req.params;

  const query = qs.stringify({
    where: {
      status: {
        equals: "published",
      },
      id: {
        equals: id,
      },
    },
  });

  const categories = await axios
    .get(`${process.env.CMS_API_URL}/pages?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs[0]);

  res.status(200).json(categories);
});
