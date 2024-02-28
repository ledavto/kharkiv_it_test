import { HttpError } from "../helpers/index.js";
import { Post } from "../models/postSchema.js";
import {
  getPostSrv,
  addPostSrv,
  checkToken,
  currentUserSrv,
} from "../services/index.js";

const getPostCtrl = async (req, res, next) => {
  try {
    const result = await getPostSrv();
    if (!result) {
      throw HttpError(404); //"Not found"
    }

    const { name, surname } = await currentUserSrv(result.owner);

    // res.status(201).json(result);

    // res.status(200);

    console.log(result);

    const rend = result
      .map((item) => {
        const date = item.createdAt;
        new Date().toDateString();
        return `<h2>${item.title}</h2> <h3>${name} ${surname} - ${date}</h3><p>${item.text}</p>`;
      })
      .join("");
    // console.log(r);

    res.send(rend);

    // res.render("postList", {
    //   rend,
    // });

    // res.render("postList", {
    //   result,
    // });
    // res.render("<h2>Title</h2>");
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

    // res.status(201).json(result);

    res.status(200);
    res.render("postList");
  } catch (error) {
    console.log(error);
  }
};

export { getPostCtrl, addPostCtrl };
