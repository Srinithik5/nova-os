import { PrismaClient } from '@prisma/client';

// A single PrismaClient instance per process. ts-node-dev hot-reloads
// src/ on every save, which would otherwise create a fresh PrismaClient
// (and a fresh connection pool) on every reload — stashing it on
// globalThis in development survives the reload the same way Next.js's
// own recommended pattern does.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}