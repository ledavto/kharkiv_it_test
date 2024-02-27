import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { app } from "./app.js";
import dotenv from "dotenv";

// dotenv.config();
// const { DB_HOST } = process.env; // Из файла .env

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(3000);
//     console.log("Server is running. Use our API on port: 3000");
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });

// Sergii     GeZ3SIUFrS09oG2P
// npm install mongoose --save
// npm i dotenv
// npm i jsonwebtoken
// npm i express-handlebars
// npm i nanoid

// npm install --save multer
// npm i gravatar
// npm i jimp
// npm i @sendgrid/mail
