'use client';

import clsx from 'clsx';
import { GlassPanel } from '@/components/primitives/GlassPanel';
import { useClock } from '@/lib/useClock';
import { buildCalendarMonth } from '@/lib/buildCalendarMonth';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Pixel match for project/Nova OS.dc.html lines 303-328. The prev/next
// month arrows and the Month/Week/Day toggle are decorative in the source
// design too — neither has an onClick there either. Real navigation and
// persisted events arrive in Phase 5.
export function CalendarApp() {
  const { now } = useClock();
  const days = buildCalendarMonth(now);
  const month = now.toLocaleDateString('en-US', { month: 'long' });
  const year = now.getFullYear();

  return (
    <GlassPanel className="h-full animate-nova-pop bg-white/[0.04]">
      <div className="flex h-[60px] flex-none items-center gap-4 border-b border-white/[0.06] px-[22px]">
        <div className="font-display text-[22px] font-semibold">
          {month} <span className="text-white/40">{year}</span>
        </div>
        <div className="flex gap-1.5 text-white/60">
          <div className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-9 bg-white/5">
            ‹
          </div>
          <div className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-9 bg-white/5">
            ›
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex gap-1.5 rounded-11 bg-white/5 p-1 text-[12.5px]">
          <span className="rounded-[8px] bg-[rgba(87,169,255,0.25)] px-3 py-[5px] text-nova-blue-pale">Month</span>
          <span className="px-3 py-[5px] text-white/50">Week</span>
          <span className="px-3 py-[5px] text-white/50">Day</span>
        </div>
      </div>

      <div className="grid flex-none grid-cols-7 px-[22px] pb-1.5 pt-3">
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className="text-[11px] font-semibold uppercase tracking-[.1em] text-white/40">
            {weekday}
          </div>
        ))}
      </div>

      <div className="grid flex-1 auto-rows-fr grid-cols-7 gap-2 overflow-auto px-[22px] pb-[22px]">
        {days.map((cell, index) => (
          <div
            key={index}
            className={clsx(
              'flex min-h-16 flex-col gap-1.5 rounded-14 border p-2.5',
              cell.isToday
                ? 'border-[rgba(87,169,255,0.4)] bg-[rgba(87,169,255,0.14)]'
                : cell.inMonth
                  ? 'border-white/5 bg-white/[0.025]'
                  : 'border-white/5 bg-transparent'
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={clsx(
                  'text-[13px] font-semibold',
                  !cell.inMonth ? 'text-white/15' : cell.isToday ? 'text-nova-bg' : 'text-white/80'
                )}
              >
                {cell.day}
              </span>
              {cell.isToday && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-nova-blue text-xs text-nova-bg">
                  {cell.day}
                </span>
              )}
            </div>
            {!cell.isToday &&
              cell.events.map((event) => (
                <div
                  key={event.title}
                  className="truncate rounded-[6px] px-1.5 py-0.5 text-[10.5px] text-white"
                  style={{ background: event.color }}
                >
                  {event.title}
                </div>
              ))}
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}