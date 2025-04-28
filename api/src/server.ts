import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { videosRouter } from "./routes/videos.js";

dotenv.config();

const app = express();
const allowedOrigins = ["http://localhost:5173", "https://vivatdah.com"];

app.use(
  express.json(),
  cors({
    origin: "*",
    /* origin: (origin, callback) =>
      origin && allowedOrigins.includes(origin)
        ? callback(null, true)
        : callback(new Error("Not allowed by CORS")), */
    credentials: true,
  })
);

app.use("/v1", videosRouter);

app.listen(5000, () => {
  console.log(`Servidor rodando em http://localhost:5000`);
});
