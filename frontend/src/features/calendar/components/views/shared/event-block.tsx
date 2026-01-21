import { format, parseISO, differenceInMinutes } from 'date-fns';

import { cn } from '@/lib/utils';
import { HOUR_HEIGHT } from '../../../constants';

import type { CalendarEvent } from '../../../types';

interface EventBlockProps {
  event: CalendarEvent;
}

const colorVariants: Record<CalendarEvent['color'], string> = {
  blue: 'bg-blue-100 border-blue-300 text-blue-800',
  green: 'bg-green-100 border-green-300 text-green-800',
  red: 'bg-red-100 border-red-300 text-red-800',
  yellow: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  purple: 'bg-purple-100 border-purple-300 text-purple-800',
  orange: 'bg-orange-100 border-orange-300 text-orange-800',
};

export function EventBlock({ event }: EventBlockProps) {
  const start = parseISO(event.startDate);
  const end = parseISO(event.endDate);
  const durationInMinutes = differenceInMinutes(end, start);
  const heightInPixels = (durationInMinutes / 60) * HOUR_HEIGHT - 4; // -4 for padding

  const isShort = durationInMinutes <= 30;

  return (
    <div
      className={cn(
        'absolute inset-x-1 overflow-hidden rounded border px-2 py-1 text-xs',
        colorVariants[event.color]
      )}
      style={{ height: `${Math.max(heightInPixels, 20)}px` }}
    >
      <p className="truncate font-medium">{event.title}</p>
      {!isShort && (
        <p className="truncate text-[10px] opacity-75">
          {format(start, 'HH:mm')} - {format(end, 'HH:mm')}
        </p>
      )}
    </div>
  );
}

