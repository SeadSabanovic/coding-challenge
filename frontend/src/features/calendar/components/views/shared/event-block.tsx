import { format, parseISO, differenceInMinutes } from 'date-fns';

import { cn } from '@/lib/utils';
import { HOUR_HEIGHT, EVENT_BLOCK_COLORS } from '../../../constants';

import type { CalendarEvent } from '../../../types';

interface EventBlockProps {
  event: CalendarEvent;
}

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
        EVENT_BLOCK_COLORS[event.color]
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
