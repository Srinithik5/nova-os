import rateLimit from 'express-rate-limit';

// Auth endpoints are the obvious brute-force target, so they get a
// tighter limit than the rest of the API (blueprint §3, §17).
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts. Please try again later.' },
});