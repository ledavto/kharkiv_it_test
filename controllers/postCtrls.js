import { HttpError } from "../helpers/index.js";
import { Post } from "../models/postSchema.js";
import { getPostSrv, addPostSrv, checkToken } from "../services/index.js";

const getPostCtrl = async (req, res, next) => {
  try {
    const result = await getPostSrv();
    if (!result) {
      throw HttpError(404); //"Not found"
    }

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const addPostCtrl = async (req, res, next) => {
  try {
    const { error } = Post.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const token =
      req.headers.authorization?.startsWith("Bearer ") &&
      req.headers.authorization.split(" ")[1];

    const userId = checkToken(token);
    const { title, text } = req.body;

    const result = await addPostSrv(title, text, userId);
    if (!result) {
      throw HttpError(404); //"Not found"
    }

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};

export { getPostCtrl, addPostCtrl };
