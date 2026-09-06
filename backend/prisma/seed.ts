import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

// The approved design has exactly one identity — Alex Rivera / alex@nova.id
// — and never designed a sign-up screen (blueprint's Login decision box).
// Rather than inventing a new UI screen the design doesn't show, this
// seeds that one account for real so the existing Login screen can
// authenticate against it. The register endpoint is still real and
// tested — it's just not exposed through a new frontend screen yet.
const DEMO_EMAIL = 'alex@nova.id';
const DEMO_PASSWORD = 'NovaOS!2026';
const DEMO_DISPLAY_NAME = 'Alex Rivera';
const DEMO_AVATAR_INITIALS = 'AR';

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } });
  if (existing) {
    console.log(`Seed: ${DEMO_EMAIL} already exists — skipping.`);
    return;
  }

  const passwordHash = await argon2.hash(DEMO_PASSWORD);
  await prisma.user.create({
    data: {
      email: DEMO_EMAIL,
      passwordHash,
      displayName: DEMO_DISPLAY_NAME,
      avatarInitials: DEMO_AVATAR_INITIALS,
    },
  });
  console.log(`Seed: created ${DEMO_EMAIL} (password: ${DEMO_PASSWORD})`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });