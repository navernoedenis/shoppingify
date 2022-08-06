import argon2 from "argon2";
import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { AppError } from "../../helpers/errors";
import { RequestBody } from "../../types/global";
import { User } from "../../database";
import { UserModel } from "../users/model";

export const signUp = async (
  req: RequestBody<Omit<UserModel, "id">>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      throw new AppError(
        "Email, password and name are required!",
        StatusCodes.BAD_REQUEST
      );
    }

    const user = await User.findOne({ where: { email } });

    if (user) {
      throw new AppError(
        `User with email: ${email} already exist!`,
        StatusCodes.BAD_REQUEST
      );
    }

    await User.create({ email, password, name });
    const me = await User.findOne({
      where: { email },
      attributes: ["id", "email", "name"]
    });

    res.status(StatusCodes.OK).json({ user: me });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: RequestBody<{ email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(
        "Email and password are required",
        StatusCodes.BAD_REQUEST
      );
    }

    const user = await User.findOne({ where: { email } }).then((user) =>
      user ? user.toJSON() : null
    );

    if (!user) {
      throw new AppError(
        `User with ${email} doesn't exist!`,
        StatusCodes.BAD_REQUEST
      );
    }

    const isPasswordMatch = await argon2.verify(user.password, password);
    if (!isPasswordMatch) {
      throw new AppError("Wront password", StatusCodes.FORBIDDEN);
    }

    const me = await User.findOne({
      where: { email },
      attributes: ["id", "email", "name"]
    });

    res.status(StatusCodes.OK).json({ user: me });
  } catch (error) {
    next(error);
  }
};
