import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env; // Из файла .env

const signToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });

const checkToken = (token) => {
  if (!token) throw HttpError(401, "Not authorized");
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    return id;
  } catch (error) {
    throw HttpError(401, "Not authorized");
  }
};

export { signToken, checkToken };
