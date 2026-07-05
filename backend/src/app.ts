import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { healthRouter } from './routes/health';
import { notFoundHandler, errorHandler } from './middleware/error';

// Allowlist, not a wildcard — the frontend sends credentials (cookies) once
// auth lands in Phase 3, and CORS forbids `credentials: true` with `origin: '*'`.
// In production this only matters for direct-to-backend calls (local dev,
// mobile clients); browser traffic normally arrives via the frontend's
// same-origin rewrite proxy (blueprint §6).
const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export function createApp(): Express {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  app.use('/api/v1/health', healthRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}