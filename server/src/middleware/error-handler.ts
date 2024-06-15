import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom.error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err, "error in error handler");
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(500).send({
    errors: [{ message: "Something went wrong" }],
  });
};
