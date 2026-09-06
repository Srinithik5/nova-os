import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import type { User } from '@prisma/client';
import { HttpError } from '../middleware/error';
import { createUser, findUserByEmail, findUserById } from '../db/userRepository';

const ACCESS_TOKEN_TTL = '15m';
const REFRESH_TOKEN_TTL = '30d';

function accessSecret(): string {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) throw new Error('JWT_ACCESS_SECRET is not set');
  return secret;
}

function refreshSecret(): string {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error('JWT_REFRESH_SECRET is not set');
  return secret;
}

export interface PublicUser {
  id: string;
  email: string;
  displayName: string;
  avatarInitials: string;
  accentColor: string;
}

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    avatarInitials: user.avatarInitials,
    accentColor: user.accentColor,
  };
}

export function deriveInitials(displayName: string): string {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

function issueTokens(userId: string): AuthTokens {
  const accessToken = jwt.sign({ sub: userId }, accessSecret(), { expiresIn: ACCESS_TOKEN_TTL });
  const refreshToken = jwt.sign({ sub: userId }, refreshSecret(), { expiresIn: REFRESH_TOKEN_TTL });
  return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string): { sub: string } | null {
  try {
    const payload = jwt.verify(token, accessSecret());
    if (typeof payload === 'object' && typeof payload.sub === 'string') {
      return { sub: payload.sub };
    }
    return null;
  } catch {
    return null;
  }
}

function verifyRefreshToken(token: string): { sub: string } | null {
  try {
    const payload = jwt.verify(token, refreshSecret());
    if (typeof payload === 'object' && typeof payload.sub === 'string') {
      return { sub: payload.sub };
    }
    return null;
  } catch {
    return null;
  }
}

export async function registerUser(email: string, password: string, displayName: string) {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new HttpError(409, 'An account with this email already exists.');
  }
  const passwordHash = await argon2.hash(password);
  const user = await createUser({
    email,
    passwordHash,
    displayName,
    avatarInitials: deriveInitials(displayName),
  });
  return { user, tokens: issueTokens(user.id) };
}

export async function loginUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new HttpError(401, 'Invalid email or password.');
  }
  const passwordMatches = await argon2.verify(user.passwordHash, password);
  if (!passwordMatches) {
    throw new HttpError(401, 'Invalid email or password.');
  }
  return { user, tokens: issueTokens(user.id) };
}

export async function refreshSession(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    throw new HttpError(401, 'Session expired, please sign in again.');
  }
  const user = await findUserById(payload.sub);
  if (!user) {
    throw new HttpError(401, 'Session expired, please sign in again.');
  }
  return { user, tokens: issueTokens(user.id) };
}

export async function getUserFromAccessTokenSubject(userId: string) {
  const user = await findUserById(userId);
  if (!user) {
    throw new HttpError(401, 'Session is no longer valid.');
  }
  return user;
}