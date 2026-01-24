import { isToday, format, parseISO } from 'date-fns';

import { cn } from '@/lib/utils';
import { EVENT_BADGE_COLORS } from '../../../constants';
import { useCalendarStore } from '../../../store/calendar-store';
import { getEventsForDay } from '../../../utils/helpers';

import type { CalendarCell } from '../../../types';

interface DayCellProps {
  cell: CalendarCell;
  isLastRow?: boolean;
}

export function DayCell({ cell, isLastRow = false }: DayCellProps) {
  const { setSelectedDate, setSelectedView, events, openEventDialog } = useCalendarStore();

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

      <div className="mt-1 flex flex-col gap-1">
        {dayEvents.map((event) => (
          <button
            key={event.id}
            type="button"
            onClick={() => openEventDialog(event)}
            className={cn(
              'flex cursor-pointer items-center gap-1.5 truncate rounded-md border px-1.5 py-0.5 text-left text-xs transition-opacity hover:opacity-80',
              EVENT_BADGE_COLORS[event.color]
            )}
          >
            <span className="dot size-1.5 shrink-0 rounded-full" />
            <span className="flex-1 truncate font-medium">{event.title}</span>
            <span className="shrink-0 text-[10px] opacity-75">
              {format(parseISO(event.startDate), 'HH:mm')}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
