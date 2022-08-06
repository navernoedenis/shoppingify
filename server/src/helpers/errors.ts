import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "types/global";

export class AppError extends Error {
  constructor(
    public errorMessage: string,
    public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(errorMessage);
  }
}

export const handleErrorMiddleware = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).send({ error: error.message });
};
