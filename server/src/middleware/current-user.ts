import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types/user-payload";
import { NotAuthorizedError } from "../errors/not-authorized.error";
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return next();
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    console.log(err);
    if (err instanceof jwt.JsonWebTokenError) {
      throw new NotAuthorizedError("Invalid token");
    }
  }

  next();
};
