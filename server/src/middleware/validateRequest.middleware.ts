import { ZodSchema, ZodError } from "zod";
import { RequestHandler, NextFunction, Request, Response } from "express";
import CustomError from "../helpers/CustomError";

export const validateRequest = (schema: ZodSchema): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction) => {

    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if ((parsed as any).body !== undefined) req.body = (parsed as any).body;
      if ((parsed as any).query !== undefined) Object.defineProperty(req, 'query', { value: (parsed as any).query, writable: true });
      if ((parsed as any).params !== undefined) Object.defineProperty(req, 'params', { value: (parsed as any).params, writable: true });

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
