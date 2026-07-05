export interface CalendarDayEvent {
  title: string;
  color: string;
}

export interface CalendarDay {
  day: number | null;
  inMonth: boolean;
  isToday: boolean;
  events: CalendarDayEvent[];
}

// Exact port of buildCalendar() from project/Nova OS.dc.html (lines
// 537-559): same month-grid math, same three hardcoded demo events
// anchored relative to today. Presentation (colors, hiding events on
// today's cell) stays in CalendarApp — this only returns data.
export function buildCalendarMonth(now: Date): CalendarDay[] {
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();

  const eventsByDay: Record<number, CalendarDayEvent[]> = {
    [Math.min(today, daysInMonth)]: [
      { title: 'Standup', color: 'rgba(87,169,255,0.5)' },
      { title: 'Design review', color: 'rgba(122,86,255,0.5)' },
    ],
    [Math.min(today + 2, daysInMonth)]: [{ title: 'Ship v4.3', color: 'rgba(45,220,255,0.4)' }],
    [Math.max(today - 3, 1)]: [{ title: 'Retro', color: 'rgba(110,255,192,0.35)' }],
  };

  const cells: CalendarDay[] = [];

  for (let i = 0; i < firstWeekday; i++) {
    cells.push({ day: null, inMonth: false, isToday: false, events: [] });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      day,
      inMonth: true,
      isToday: day === today,
      events: eventsByDay[day] ?? [],
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ day: null, inMonth: false, isToday: false, events: [] });
  }

  return cells;
}