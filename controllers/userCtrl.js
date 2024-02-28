import { HttpError } from "../helpers/index.js";
import { User } from "../models/userSchema.js";
import {
  loginUserSrv,
  logoutUserSrv,
  addUserSrv,
  currentUserSrv,
} from "../services/index.js";

const loginUserCtrl = async (req, res, next) => {
  try {
    const { error } = await User.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { user, token } = await loginUserSrv(req.body);

    // if (!user.verify) throw HttpError(404, "User not verification!");

    // res.status(200).json({
    //   token,
    //   user: {
    //     email: user.email,
    //   },
    // });

    // res.user = user;
    req.user = user;
    
    res.status(200);
    

    res.render("loginOk", {token});
  } catch (error) {
    next(error);
  }
};

const logoutUserCtrl = async (req, res, next) => {
  try {
    const token = req.params.token;

    const user = await logoutUserSrv(token);
    // res.status(204).json();
    res.render("home");
  } catch (error) {
    next(error);
  }
};

const registerUserCtrl = async (req, res, next) => {
  try {
    //Валидация
    const { error } = await User.validate(req.body);
    if (error) throw HttpError(400, error.message);

    //Проверка на уникальность Email
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }

    const { email, name, surname } = await addUserSrv(req.body);

    // res.status(201).json({
    //   user: {
    //     name,
    //     surname,
    //     email,
    //   },
    // });
    res.status(201);
    res.render("registerOk");
  } catch (error) {
    next(error);
  }
};

const currentUserCtrl = async (req, res, next) => {
  try {

  const token = req.params.token;
    
      const { email, name, surname } = await currentUserSrv(token);

    res.status(200).json({
      name,
      surname,
      email,
    });
  } catch (error) {
    next(error);
  }
};

export { loginUserCtrl, logoutUserCtrl, registerUserCtrl, currentUserCtrl };
