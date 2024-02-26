import { HttpError } from "../helpers/index.js";
import { getPostSrv, addPostSrv } from "../services/index.js";

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
    const result = await addPostSrv(req.body);
    if (!result) {
      throw HttpError(404); //"Not found"
    }

    res.status(201).json(result);
  } catch (error) {}
};

export { getPostCtrl, addPostCtrl };
