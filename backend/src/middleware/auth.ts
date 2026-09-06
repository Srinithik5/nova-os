import type { NextFunction, Request, Response } from 'express';
import { ACCESS_TOKEN_COOKIE } from '../utils/cookies';
import { verifyAccessToken } from '../services/authService';
import { HttpError } from './error';

// Guards every route that needs a signed-in user. Reads the httpOnly
// access-token cookie (never a header — the frontend's JS can't read it
// either) and attaches `req.user` for downstream handlers.
export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const token = req.cookies?.[ACCESS_TOKEN_COOKIE] as string | undefined;
  if (!token) {
    next(new HttpError(401, 'Not signed in.'));
    return;
  }
  const payload = verifyAccessToken(token);
  if (!payload) {
    next(new HttpError(401, 'Session expired, please sign in again.'));
    return;
  }
  req.user = { id: payload.sub };
  next();
}