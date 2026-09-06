import { Router } from 'express';
import { z } from 'zod';
import * as authController from '../controllers/authController';
import { requireAuth } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  displayName: z.string().trim().min(1, 'Display name is required.').max(80),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

authRouter.post('/register', validateBody(registerSchema), asyncHandler(authController.register));
authRouter.post('/login', validateBody(loginSchema), asyncHandler(authController.login));
authRouter.post('/refresh', asyncHandler(authController.refresh));
authRouter.post('/logout', authController.logout);
authRouter.get('/me', requireAuth, asyncHandler(authController.me));