import { isToday, format, parseISO } from 'date-fns';

import { cn } from '@/lib/utils';
import { useCalendarStore } from '../../../store/calendar-store';
import { getEventsForDay } from '../../../utils/helpers';

import type { CalendarCell, CalendarEvent } from '../../../types';

interface DayCellProps {
  cell: CalendarCell;
  isLastRow?: boolean;
}

// Mixed variant - colored background + dot + text
const badgeColors: Record<CalendarEvent['color'], string> = {
  blue: 'border-blue-200 bg-blue-50 text-blue-700 [&_.dot]:bg-blue-500',
  green: 'border-green-200 bg-green-50 text-green-700 [&_.dot]:bg-green-500',
  red: 'border-red-200 bg-red-50 text-red-700 [&_.dot]:bg-red-500',
  yellow: 'border-yellow-200 bg-yellow-50 text-yellow-700 [&_.dot]:bg-yellow-500',
  purple: 'border-purple-200 bg-purple-50 text-purple-700 [&_.dot]:bg-purple-500',
  orange: 'border-orange-200 bg-orange-50 text-orange-700 [&_.dot]:bg-orange-500',
};

export function DayCell({ cell, isLastRow = false }: DayCellProps) {
  const { setSelectedDate, setSelectedView, events } = useCalendarStore();

  const { day, currentMonth, date } = cell;
  const isCurrentDay = isToday(date);
  const isSunday = date.getDay() === 0;

  const dayEvents = getEventsForDay(events, date);

  const handleDayClick = () => {
    setSelectedDate(date);
    setSelectedView('day');
  };

  return (
    <div
      className={cn(
        'flex min-h-24 flex-col p-1',
        !isSunday && 'border-r',
        !isLastRow && 'border-b',
        !currentMonth && 'bg-accent/70'
      )}
    >
      <button
        onClick={handleDayClick}
        className={cn(
          'flex size-7 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors hover:bg-accent',
          !currentMonth && 'text-muted-foreground',
          isCurrentDay && 'bg-primary text-primary-foreground hover:bg-primary/90'
        )}
      >
        {day}
      </button>

      {/* Event badges - mixed variant */}
      <div className="mt-1 flex flex-col gap-1">
        {dayEvents.map((event) => (
          <div
            key={event.id}
            className={cn(
              'flex items-center gap-1.5 truncate rounded-md border px-1.5 py-0.5 text-xs',
              badgeColors[event.color]
            )}
          >
            <span className="dot size-1.5 shrink-0 rounded-full" />
            <span className="flex-1 truncate font-medium">{event.title}</span>
            <span className="shrink-0 text-[10px] opacity-75">
              {format(parseISO(event.startDate), 'HH:mm')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
