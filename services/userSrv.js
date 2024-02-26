import HttpError from "../../helpers/HttpError.js";
import { User } from "../../models/userSchema.js";
import { signToken } from "./jwtServices.js";

async function addUserSrv(userData) {
  const urlAva = gravatar.url(userData.email, {
    s: "200",
    r: "pg",
    d: "404",
  });
  userData.avatarURL = gravatar.url(urlAva);
  
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

  user.password = undefined;

  const token = signToken(user.id);
  user.token = token;

  //Добавляем в базу значение ТОКЕНА для пользователя который логинится
  await User.findByIdAndUpdate(user.id, user);

  return { user, token };
}

async function logoutUserSrv({ id }) {
  //Повертає об'єкт доданого юзера (з id).
  const user = await User.findOne({ id });
  if (!user) throw HttpError(401, "User data not found");

  user.token = null;

  //Очищаем в базе значение ТОКЕНА для пользователя
  const userMod = await User.findByIdAndUpdate(user.id, user);

  return userMod;
}

export { loginUserSrv, logoutUserSrv };