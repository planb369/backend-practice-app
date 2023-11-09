import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../httpStatus/HTTP_STATUS_CODES";
import { HTTP_STATUS_MESSAGE } from "../httpStatus/HTTP_STATUS_MESSAGE";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { MethodNotAllowedError } from "../errors/MethodNotAllowedError";

export function handleErrors(err: Error, res: Response) {
  if (err instanceof BadRequestError) {
    console.error(`${HTTP_STATUS_MESSAGE[400]} : `, err.message);
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      error: HTTP_STATUS_MESSAGE[400],
      details: err.message,
    });
  }
  if (err instanceof NotFoundError) {
    console.error(`${HTTP_STATUS_MESSAGE[404]} : `, err.message);
    return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
      error: HTTP_STATUS_MESSAGE[404],
      details: err.message,
    });
  }
  if (err instanceof MethodNotAllowedError) {
    console.error(`${HTTP_STATUS_MESSAGE[405]} : `, err.message);
    return res.status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED).json({
      error: HTTP_STATUS_MESSAGE[405],
      details: err.message,
    });
  }

  if (err instanceof Error) {
    console.error(`${HTTP_STATUS_MESSAGE[500]} : `, err.message);
    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      error: HTTP_STATUS_MESSAGE[500],
      details: err.message,
    });
  }
}
