import type { Response } from 'express';

export const ACCESS_TOKEN_COOKIE = 'nova_access_token';
export const REFRESH_TOKEN_COOKIE = 'nova_refresh_token';

const ACCESS_TOKEN_MAX_AGE_MS = 15 * 60 * 1000; // 15 minutes
const REFRESH_TOKEN_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const isProduction = process.env.NODE_ENV === 'production';

// httpOnly + Secure(prod) + SameSite=Lax so frontend JavaScript never sees
// either token (blueprint §8) — the only thing that can steal them is a
// server-side compromise, not XSS. The refresh cookie's path restricts it
// to the one route that ever needs to read it.
export function setAuthCookies(res: Response, tokens: { accessToken: string; refreshToken: string }): void {
  res.cookie(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: ACCESS_TOKEN_MAX_AGE_MS,
  });
  res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/api/v1/auth/refresh',
    maxAge: REFRESH_TOKEN_MAX_AGE_MS,
  });
}

export function clearAuthCookies(res: Response): void {
  res.clearCookie(ACCESS_TOKEN_COOKIE, { path: '/' });
  res.clearCookie(REFRESH_TOKEN_COOKIE, { path: '/api/v1/auth/refresh' });
}