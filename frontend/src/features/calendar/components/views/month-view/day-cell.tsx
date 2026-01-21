import { isToday } from 'date-fns';

import { cn } from '@/lib/utils';
import { useCalendarStore } from '../../../store/calendar-store';

import type { CalendarCell } from '../../../types';

interface DayCellProps {
  cell: CalendarCell;
  isLastRow?: boolean;
}

export function DayCell({ cell, isLastRow = false }: DayCellProps) {
  const { setSelectedDate, setSelectedView } = useCalendarStore();

  const { day, currentMonth, date } = cell;
  const isCurrentDay = isToday(date);
  const isSunday = date.getDay() === 0;

  const handleClick = () => {
    setSelectedDate(date);
    setSelectedView('day');
  };

  return (
    <div
      className={cn(
        'flex min-h-24 flex-col p-1',
        !isSunday && 'border-r',
        !isLastRow && 'border-b',
        !currentMonth && 'bg-gray-50'
      )}
    >
      <button
        onClick={handleClick}
        className={cn(
          'flex size-7 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors hover:bg-accent',
          !currentMonth && 'text-muted-foreground',
          isCurrentDay && 'bg-primary text-primary-foreground hover:bg-primary/90'
        )}
      >
        {day}
      </button>

      {/* Event slots - will be populated later */}
      <div className="mt-1 flex flex-1 flex-col gap-1">{/* Events will go here */}</div>
    </div>
  );
}
