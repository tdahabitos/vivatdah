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
      show_at_menu: {
        equals: true,
      },
      sort: ["order"],
    },
  });

  const pages = await axios
    .get(`${process.env.CMS_API_URL}/pages?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs);

  res.status(200).json(pages);
});

pagesRouter.get("/pages/:slug", async (req, res) => {
  const { slug } = req.params;

  const query = qs.stringify({
    where: {
      status: {
        equals: "published",
      },
      slug: {
        equals: slug,
      },
    },
  });

  const page = await axios
    .get(`${process.env.CMS_API_URL}/pages?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs[0]);

  res.status(200).json(page);
});
