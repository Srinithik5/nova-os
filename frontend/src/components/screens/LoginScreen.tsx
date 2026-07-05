'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Avatar } from '@/components/primitives/Avatar';
import { Icon } from '@/components/primitives/Icon';
import { BootBrandMark } from './BootBrandMark';

// Pixel/behavior match for project/Nova OS.dc.html lines 56-71. Wrapped in
// a real <form> (the prototype used a bare onClick) so Enter-to-submit and
// basic accessibility come for free — no visual change.
export function LoginScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Phase 1 has no backend (blueprint §14) — any submission advances to
    // the desktop placeholder, matching the prototype's own doLogin, which
    // accepts any password. Real credential verification arrives in Phase 3.
    router.push('/desktop');
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
          className="flex-1 bg-transparent text-[15px] tracking-[.16em] text-white outline-none placeholder:text-white/40"
        />
        <button
          type="submit"
          aria-label="Sign in"
          className="flex h-11 w-11 items-center justify-center rounded-12 bg-[linear-gradient(140deg,#7cc0ff,#57a9ff)] text-nova-bg shadow-glow"
        >
          <Icon name="arrow" size={20} />
        </button>
      </form>

      <div className="mt-4 text-[13px] text-white/40">
        Use <span className="text-nova-blue-soft">Nova&nbsp;ID</span> · Touch to authenticate
      </div>
    </motion.div>
  );
}