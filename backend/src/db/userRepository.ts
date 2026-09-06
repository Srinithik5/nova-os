import type { User } from '@prisma/client';
import { prisma } from './prisma';

// The only module that imports @prisma/client for User data (blueprint §3:
// "repositories — one per Prisma model, the only layer that imports
// @prisma/client").

export function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export interface CreateUserInput {
  email: string;
  passwordHash: string;
  displayName: string;
  avatarInitials: string;
}

export function createUser(input: CreateUserInput): Promise<User> {
  return prisma.user.create({ data: input });
}