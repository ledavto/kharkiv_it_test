import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userSchema.js";
import { signToken } from "./jwtServices.js";

const getUserSrv = async (id) => User.findById(id);

async function currentUserSrv(token) {
  //Повертає об'єкт доданого юзера (з id).

  const user = await User.findOne({ token });
  if (!user) throw HttpError(401, "User data not found");

  return user;
}

async function addUserSrv(userData) {
  //Повертає об'єкт доданого юзера (з id).
  const resAddDb = await User.create(userData);

  return resAddDb;
}

async function loginUserSrv({ email, password }) {
  //Повертає об'єкт доданого юзера (з id).
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");

  const isPasswordValidate = await user.checkPassword(password, user.password);

  if (!isPasswordValidate) throw HttpError(401, "Email or password is wrong");

  const token = signToken(user.id);
  user.token = token;

  //Добавляем в базу значение ТОКЕНА для пользователя который логинится
  await User.findByIdAndUpdate(user.id, user);
  user.password = undefined;

  
  return { user, token };
}

async function logoutUserSrv(token) {
  //Повертає об'єкт доданого юзера (з id).

  const user = await User.findOne({ token });
  if (!user) throw HttpError(401, "User data not found");

  user.token = null;

  //Очищаем в базе значение ТОКЕНА для пользователя
  const userMod = await User.findByIdAndUpdate(user.id, user);

  return userMod;
}

export { addUserSrv, loginUserSrv, logoutUserSrv, getUserSrv, currentUserSrv };
