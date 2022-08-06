import { Request } from "express";

export interface CustomError extends Error {
  statusCode: number;
}

export interface RequestBody<T> extends Request {
  body: T;
}
