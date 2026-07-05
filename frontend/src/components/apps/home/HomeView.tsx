'use client';

import { Icon } from '@/components/primitives/Icon';
import { ProgressBar } from '@/components/primitives/ProgressBar';
import { GlassPanel } from '@/components/primitives/GlassPanel';
import { useClock } from '@/lib/useClock';
import { useWindowManager } from '@/stores/windowManager';

const SYSTEM_STATS = [
  { label: 'Neural Core', value: 42 },
  { label: 'Memory', value: 61 },
  { label: 'Storage', value: 68 },
];

const TODAY_EVENTS = [
  { time: '10:00', title: 'Standup', color: '#57a9ff' },
  { time: '15:00', title: 'Design review', color: '#7a56ff' },
  { time: '18:30', title: 'Gym', color: '#2ddcff' },
];

// Pixel match for project/Nova OS.dc.html lines 109-175. "Ask Nova" and
// "Do it" are visually complete but inert until Phase 7 (blueprint §14).
export function HomeView() {
  const { date, now } = useClock();
  const openApp = useWindowManager((s) => s.openApp);

  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="flex h-full flex-col gap-[18px] overflow-auto">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="font-display text-[34px] font-semibold tracking-[-0.02em]">{greeting}, Alex</div>
          <div className="mt-1 text-[15px] text-white/50">{date} · All systems nominal</div>
        </div>
        {/* Phase 7 wires this to the AI Assistant panel */}
        <button
          type="button"
          className="flex items-center gap-2.5 rounded-14 border border-[rgba(87,169,255,0.28)] bg-[rgba(87,169,255,0.12)] px-4 py-2.5 text-sm font-semibold text-nova-blue-pale transition-colors hover:bg-[rgba(87,169,255,0.2)]"
        >
          <Icon name="sparkle" size={18} /> Ask Nova
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] auto-rows-min gap-4">
        <GlassPanel className="bg-white/[0.045] p-5">
          <div className="flex justify-between text-[13px] font-semibold text-white/55">
            San Francisco <Icon name="cloud" size={20} />
          </div>
          <div className="mt-2 font-display text-[52px] font-medium">18°</div>
          <div className="text-[13px] text-white/50">Partly cloudy · H:21° L:13°</div>
        </GlassPanel>

        <GlassPanel className="bg-white/[0.045] p-5">
          <div className="flex items-center justify-between text-[13px] font-semibold text-white/55">
            System <Icon name="cpu" size={18} />
          </div>
          <div className="mt-3.5 flex flex-col gap-[11px]">
            {SYSTEM_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="mb-[5px] flex justify-between text-xs text-white/60">
                  <span>{stat.label}</span>
                  <span className="font-semibold text-nova-blue-soft">{stat.value}%</span>
                </div>
                <ProgressBar percent={stat.value} />
              </div>
            ))}
          </div>
        </GlassPanel>

        <button type="button" onClick={() => openApp('music')} className="text-left">
          <GlassPanel className="bg-white/[0.045] p-5 transition-colors hover:border-[rgba(87,169,255,0.4)]">
            <div className="text-[13px] font-semibold text-white/55">
              Now Playing <Icon name="music" size={18} />
            </div>
            <div className="mt-3.5 flex items-center gap-3.5">
              <div className="h-[58px] w-[58px] flex-none rounded-14 bg-[repeating-linear-gradient(135deg,#1a2a4a,#1a2a4a_6px,#22355c_6px,#22355c_12px)]" />
              <div className="min-w-0">
                <div className="truncate text-[15px] font-semibold">Neon Horizon</div>
                <div className="text-[13px] text-white/50">Aeon Drift</div>
              </div>
            </div>
            <div className="mt-3.5">
              <ProgressBar percent={42} trackClassName="h-1" />
            </div>
          </GlassPanel>
        </button>

        <div className="col-span-2 overflow-hidden rounded-22 border border-[rgba(87,169,255,0.2)] bg-[linear-gradient(135deg,rgba(87,169,255,0.14),rgba(122,86,255,0.1))] p-5">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-nova-blue-soft">
            <Icon name="sparkle" size={18} /> Nova suggests
          </div>
          <div className="mt-3 max-w-[520px] text-lg leading-relaxed">
            You have a design review at 3:00 PM. Want me to summarize the 4 files in{' '}
            <span className="text-nova-blue-soft">/Projects/Nova</span> and draft talking points?
          </div>
          <div className="mt-4 flex gap-2.5">
            {/* Phase 7 wires this to the AI Assistant panel */}
            <button
              type="button"
              className="rounded-11 bg-[linear-gradient(140deg,#7cc0ff,#57a9ff)] px-4 py-2.5 text-[13px] font-semibold text-nova-bg"
            >
              Do it
            </button>
            <button
              type="button"
              className="rounded-11 border border-white/[0.12] bg-white/[0.06] px-4 py-2.5 text-[13px] font-semibold text-nova-blue-pale"
            >
              Later
            </button>
          </div>
        </div>

        <button type="button" onClick={() => openApp('calendar')} className="text-left">
          <GlassPanel className="bg-white/[0.045] p-5 transition-colors hover:border-[rgba(87,169,255,0.4)]">
            <div className="text-[13px] font-semibold text-white/55">
              Today <Icon name="cal" size={18} />
            </div>
            <div className="mt-3 flex flex-col gap-[9px]">
              {TODAY_EVENTS.map((event) => (
                <div key={event.title} className="flex items-center gap-2.5 text-[13px]">
                  <span className="font-bold" style={{ color: event.color }}>
                    {event.time}
                  </span>
                  <span className="text-white/80">{event.title}</span>
                </div>
              ))}
            </div>
          </GlassPanel>
        </button>
      </div>
    </div>
  );
}