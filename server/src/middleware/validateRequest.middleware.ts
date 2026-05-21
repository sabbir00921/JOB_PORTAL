import { ZodSchema, ZodError } from "zod";
import { RequestHandler, NextFunction, Request, Response } from "express";
import CustomError from "../helpers/CustomError";

export const validateRequest = (schema: ZodSchema): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction) => {

    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));
        const message = errors.map((e) => e.message).join(", ");
        return next(new CustomError(400, message, errors));
      }
      next(err);
    }
  };
};
