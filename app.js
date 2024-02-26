import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import mongoose from "mongoose";

import multer from "multer";
import path from "path";
import {postsRouter, usersRouter} from "./routes/index.js";

const uploadDir = path.join(process.cwd(), "public", "images");
// const storeImage = path.join(process.cwd(), 'images');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

const app = express();

dotenv.config();
// dotenv.config({ path: process.env.NODE_ENV === "production" ? "./.env" : });

const { DB_HOST, PORT } = process.env; // Из файла .env

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/post", postsRouter);
app.use("/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
