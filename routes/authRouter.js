import express from "express";
import {
  loginUserCtrl,
  logoutUserCtrl,
  registerUserCtrl,
  currentUserCtrl,
} from "../controllers/index.js";
import { protect } from "../middlewares/index.js";

const usersRouter = express.Router();

usersRouter
  .post("/register", registerUserCtrl)
  .post("/login", loginUserCtrl)
  .get("/logout/:token", protect, logoutUserCtrl)
  .get("/current/:token", protect, currentUserCtrl);

export default usersRouter;
