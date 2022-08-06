import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { AppError } from "./errors";
import { RequestBody } from "../types/global";
import { User } from "../database";

enum AuthHeaders {
  id = "x-user-id",
  email = "x-user-email"
}

export const protect = async (
  req: RequestBody<{ userId: number; email: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.headers[AuthHeaders.id]);
    const userEmail = req.headers[AuthHeaders.email];

    if (!userId || !userEmail) {
      throw new AppError("No user id and email", StatusCodes.FORBIDDEN);
    }

    const user = await User.findByPk(userId).then((response) =>
      response ? response.toJSON() : null
    );

    if (!user) {
      throw new AppError("No user in database", StatusCodes.FORBIDDEN);
    }

    if (user.email !== userEmail) {
      throw new AppError("Email doesn't match", StatusCodes.FORBIDDEN);
    }

    next();
  } catch (error) {
    next(error);
  }
};
