import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import { HttpError } from './error';

// Generic request-body validator (blueprint §3: "input-validated with
// Zod"). Every auth route declares its own schema; this middleware is the
// only place that knows how to turn a ZodError into an HTTP 400.
export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.errors.map((e) => e.message).join(', ');
      next(new HttpError(400, message || 'Invalid request body.'));
      return;
    }
    req.body = result.data;
    next();
  };
}