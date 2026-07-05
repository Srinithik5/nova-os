import { useEffect, useState } from 'react';

export interface Clock {
  now: Date;
  time: string;
  date: string;
}

function readClock(): Clock {
  const now = new Date();
  return {
    now,
    time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    date: now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
  };
}

// Matches the prototype's componentDidMount interval (project/Nova OS.dc.html
// lines 484-485) — re-reads the clock every second so the lock screen's
// time stays live. `now` (Phase 2 addition) exposes the raw Date so
// consumers like HomeView's time-of-day greeting and CalendarApp's
// month/year header can derive from the same single ticking clock instead
// of each running their own setInterval.
export function useClock(): Clock {
  const [clock, setClock] = useState<Clock>(readClock);

  useEffect(() => {
    const id = setInterval(() => setClock(readClock()), 1000);
    return () => clearInterval(id);
  }, []);

  return clock;
}