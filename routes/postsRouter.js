import express from "express";
import { getPostCtrl, addPostCtrl} from "../controllers/index.js";

const postsRouter = express.Router();

postsRouter.use(protect);
postsRouter.get("/", getPostCtrl);
postsRouter.post("/", addPostCtrl);


export default postsRouter;
