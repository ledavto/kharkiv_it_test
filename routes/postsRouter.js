import express from "express";
import { getPostCtrl, addPostCtrl } from "../controllers/index.js";
import { protect } from "../middlewares/index.js";

const postsRouter = express.Router();

// postsRouter.use(protect);
postsRouter.get("/list", getPostCtrl);
postsRouter.post("/", addPostCtrl);

export default postsRouter;
