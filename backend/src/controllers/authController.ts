import type { Request, Response } from 'express';
import {
  getUserFromAccessTokenSubject,
  loginUser,
  refreshSession,
  registerUser,
  toPublicUser,
} from '../services/authService';
import { setAuthCookies, clearAuthCookies, REFRESH_TOKEN_COOKIE } from '../utils/cookies';
import { HttpError } from '../middleware/error';

export async function register(req: Request, res: Response): Promise<void> {
  const { email, password, displayName } = req.body as {
    email: string;
    password: string;
    displayName: string;
  };
  const { user, tokens } = await registerUser(email, password, displayName);
  setAuthCookies(res, tokens);
  res.status(201).json(toPublicUser(user));
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as { email: string; password: string };
  const { user, tokens } = await loginUser(email, password);
  setAuthCookies(res, tokens);
  res.status(200).json(toPublicUser(user));
}

export async function refresh(req: Request, res: Response): Promise<void> {
  const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE] as string | undefined;
  if (!refreshToken) {
    throw new HttpError(401, 'Session expired, please sign in again.');
  }
  const { user, tokens } = await refreshSession(refreshToken);
  setAuthCookies(res, tokens);
  res.status(200).json(toPublicUser(user));
}

export function logout(_req: Request, res: Response): void {
  clearAuthCookies(res);
  res.status(204).send();
}

export async function me(req: Request, res: Response): Promise<void> {
  // requireAuth has already verified the token and set req.user by the
  // time this runs.
  const user = await getUserFromAccessTokenSubject(req.user!.id);
  res.status(200).json(toPublicUser(user));
}