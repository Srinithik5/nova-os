import { useEffect, useState } from 'react';

export interface Clock {
  time: string;
  date: string;
}

function readClock(): Clock {
  const now = new Date();
  return {
    time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    date: now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
  };
}

// Matches the prototype's componentDidMount interval (project/Nova OS.dc.html
// lines 484-485) — re-reads the clock every second so the lock screen's
// time stays live. Only ever imported by client components (LockScreen).
export function useClock(): Clock {
  const [clock, setClock] = useState<Clock>(readClock);

  useEffect(() => {
    const id = setInterval(() => setClock(readClock()), 1000);
    return () => clearInterval(id);
  }, []);

  return clock;
}