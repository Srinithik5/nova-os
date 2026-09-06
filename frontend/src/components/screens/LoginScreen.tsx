'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/primitives/Avatar';
import { Icon } from '@/components/primitives/Icon';
import { BootBrandMark } from './BootBrandMark';
import { login } from '@/lib/api';
import { useSessionStore } from '@/stores/session';

// The approved design never shows a sign-up screen — it's a single-identity
// "personal OS" (Alex Rivera / alex@nova.id), seeded server-side
// (backend/prisma/seed.ts) rather than inventing a new UI screen the
// design doesn't have. This same form now serves both first sign-in and
// post-lock unlock (blueprint §8) — both are "prove you know the password."
const ACCOUNT_EMAIL = 'alex@nova.id';

// Pixel match for project/Nova OS.dc.html lines 56-71, now backed by a
// real POST /api/v1/auth/login (blueprint §14, Phase 3) instead of
// advancing on any password.
export function LoginScreen() {
  const router = useRouter();
  const setUser = useSessionStore((s) => s.setUser);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const user = await login(ACCOUNT_EMAIL, password);
      setUser(user);
      router.push('/desktop');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center"
    >
      <BootBrandMark />

      <Avatar initials="AR" size={132} textClassName="text-[46px]" glow />

      <div className="mt-[22px] font-display text-[26px] font-semibold">Alex Rivera</div>
      <div className="mt-1 text-sm text-white/45">alex@nova.id</div>

      <form
        onSubmit={handleSubmit}
        className="mt-[30px] flex w-[340px] items-center gap-2.5 rounded-16 border border-white/[0.12] bg-white/5 py-1.5 pl-5 pr-1.5 backdrop-blur-24"
      >
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter password"
          aria-label="Password"
          disabled={submitting}
          autoFocus
          className="flex-1 bg-transparent text-[15px] tracking-[.16em] text-white outline-none placeholder:text-white/40 disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label="Sign in"
          disabled={submitting}
          className="flex h-11 w-11 items-center justify-center rounded-12 bg-[linear-gradient(140deg,#7cc0ff,#57a9ff)] text-nova-bg shadow-glow disabled:opacity-60"
        >
          <Icon name="arrow" size={20} />
        </button>
      </form>

      {error && <div className="mt-3 text-[13px] text-[#ff8f8f]">{error}</div>}

      <div className="mt-4 text-[13px] text-white/40">
        Use <span className="text-nova-blue-soft">Nova&nbsp;ID</span> · Touch to authenticate
      </div>
    </motion.div>
  );
}