import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { RequestValidationError } from "../errors/request-validation.error";

const validate =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => {
        const regex = /"([^"]*)"/g;
        const message = detail.message.replace(regex, "$1");
        const field = detail.message.match(regex)![0].replace(regex, "$1");

        return {
          message,
          field,
        };
      });

      throw new RequestValidationError(errorMessage);
    }

    Object.assign(req, value);
    next();
  };

export { validate };
