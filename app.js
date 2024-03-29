import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import mongoose from "mongoose";

import multer from "multer";
import { postsRouter, usersRouter } from "./routes/index.js";
import { protect } from "./middlewares/authMiddleware.js";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: {
//     fileSize: 1048576,
//   },
// });

// const upload = multer({
//   storage: storage,
// });

const app = express();

// app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

//Шаблонизатор
app.get("/", (req, res) => {
  res.render("home"); //Отображение страницы home
});

app.get("/register", (req, res) => {
  res.render("register"); //Отображение страницы register
});

app.get("/login", (req, res) => {
  res.render("login"); //Отображение страницы login
});

app.get("/post/new/:token", protect, (req, res) => {

  const token  = req.params.token;
  res.render("postNew", {token}); //Отображение страницы login
});

app.use("/post", postsRouter);

app.use("/user", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
