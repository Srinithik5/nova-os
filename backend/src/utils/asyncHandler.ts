import type { NextFunction, Request, Response } from 'express';

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

// Express 4 does not forward a rejected promise from an async handler to
// the error middleware on its own — without this, a thrown HttpError
// (e.g. wrong password) would produce an unhandled rejection instead of a
// clean 401 response.
export function asyncHandler(handler: AsyncRouteHandler) {
  return (req: Request, res: Response, next: NextFunction): void => {
    handler(req, res, next).catch(next);
  };
}