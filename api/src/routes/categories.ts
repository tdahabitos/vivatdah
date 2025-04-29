import express from "express";
import axios from "axios";
import qs from "qs";

export const categoriesRouter = express.Router();

categoriesRouter.get("/categories", async (req, res) => {
  const { free_content } = req.query;

  const query = qs.stringify({
    where: {
      status: {
        equals: "published",
      },
      ...(free_content === "true" && {
        free_content: { equals: true },
      }),
    },
  });

  const categories = await axios
    .get(`${process.env.CMS_API_URL}/categories?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs);

  res.status(200).json(categories);
});

categoriesRouter.get("/categories/:id", async (req, res) => {
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
    .get(`${process.env.CMS_API_URL}/categories?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data.docs[0]);

  res.status(200).json(categories);
});
