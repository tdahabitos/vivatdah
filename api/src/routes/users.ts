import express from "express";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import QueryString from "qs";
import { Category } from "@/types";
import { auth } from "@/middlewares/auth";

export const usersRouter = express.Router();

usersRouter.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.admin.getUserById(id);

  if (error) {
    res.status(200).json(null);
  }

  res.status(200).json({
    id: user?.id,
    name: user?.user_metadata.full_name,
    avatar: user?.user_metadata.avatar,
  });
});

usersRouter.get("/users/auth-check", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    res.status(200).json(false);
    return;
  }

  const auth = await axios
    .get(`${process.env.CMS_API_URL}/globals/authentication`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) => res.data);

  if (!auth.auth_private_mode) {
    res.status(200).json(true);
    return;
  }

  res.status(200).json(
    auth.auth_allowed_user_emails
      .replace(/\s/g, "")
      .split(",")
      .map((email: string) => email.toLowerCase())
      .includes((email as string).toLowerCase())
  );
});

usersRouter.get("/users/access/allowed-categories", auth, async (req, res) => {
  const { email } = req.query;

  const query = QueryString.stringify({
    where: {
      email: {
        equals: email,
      },
    },
  });

  const allowedCategories = await axios
    .get(`${process.env.CMS_API_URL}/access?${query}`, {
      headers: {
        accept: "application/json",
        Authorization: process.env.CMS_API_KEY,
      },
    })
    .then((res) =>
      res.data.docs[0].allowed_categories.map((c: Category) => c.id)
    )
    .catch(() => []);

  res.status(200).json(allowedCategories);
});
