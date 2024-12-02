import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { create, findOne } from "../repository/userRepository.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokenUtils.js";

export const createUser = async ({
  username,
  email,
  password,
  phone,
  address,
}) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await create({
      username,
      phone,
      address,
      email,
      password: hash,
    });

    const accessToken = generateAccessToken(user._id);
    const setRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = setRefreshToken;
    await user.save();

    return {
      user,
      accessToken,
    };
  } catch (err) {
    throw new Error("Ошибка при обработке регистрации" + err);
  }
};

export const findUser = async ({ email, password }) => {
  try {
    const user = await findOne({ email });
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      throw new Error("Неверный логин или пароль");
    }

    const accessToken = generateAccessToken(user._id);
    const setRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = setRefreshToken;
    await user.save();

    return {
      user,
      accessToken,
    };
  } catch (err) {
    throw new Error("Ошибка при входе в аккаунт");
  }
};

export const updateToken = async ({ refreshToken }) => {
  const user = await findOne({ refreshToken });
  if (!user) {
    throw new Error("Пользователь не найден");
  }

  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken(user._id);
    const setRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = setRefreshToken;
    await user.save();

    return {
      user,
      accessToken,
    };
  } catch (err) {
    throw new Error("Токен не действителен");
  }
};
