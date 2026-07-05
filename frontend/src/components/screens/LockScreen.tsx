'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/primitives/Icon';
import { useClock } from '@/lib/useClock';
import { BootBrandMark } from './BootBrandMark';

// Pixel/behavior match for project/Nova OS.dc.html lines 40-54. The
// prototype advances on any click; keyboard activation (Enter/Space) is
// added for accessibility — no visual change, no scope beyond the design.
export function LockScreen() {
  const router = useRouter();
  const { time, date } = useClock();

  function unlock() {
    router.push('/login');
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={unlock}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          unlock();
        }
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="absolute inset-0 z-50 flex cursor-pointer flex-col items-center justify-center"
    >
      <BootBrandMark />

      <div className="font-display text-[132px] font-medium leading-none tracking-[-0.04em] [text-shadow:0_0_60px_rgba(87,169,255,0.35)]">
        {time}
      </div>
      <div className="mt-2.5 text-[22px] font-medium text-white/70">{date}</div>

      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] text-nova-blue-soft [backdrop-filter:blur(20px)]">
          <Icon name="lock" size={24} />
        </div>
        <div className="animate-nova-pulse text-[13px] uppercase tracking-[.14em] text-white/40">
          Click to unlock
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[34px] flex justify-center gap-[22px] text-white/45">
        <Icon name="wifi" size={18} />
        <Icon name="battery" size={18} />
      </div>
    </motion.div>
  );
}