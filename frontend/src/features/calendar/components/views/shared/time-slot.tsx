import { setHours, setMinutes } from 'date-fns';

import { cn } from '@/lib/utils';
import { HOUR_HEIGHT } from '../../../constants';
import { useCalendarStore } from '../../../store/calendar-store';

interface TimeSlotProps {
  date: Date;
  hour: number;
  isLast?: boolean;
  isLoading?: boolean;
}

export function TimeSlot({ date, hour, isLast = false, isLoading = false }: TimeSlotProps) {
  const openEventDialog = useCalendarStore((state) => state.openEventDialog);

  const handleHalfHourClick = (halfIndex: number) => {
    const minutes = halfIndex * 30;
    const selectedTime = setMinutes(setHours(date, hour), minutes);
    openEventDialog(undefined, selectedTime);
  };

  return (
    <div
      className={cn(
        'relative',
        !isLast && 'border-b',
        isLoading && 'pointer-events-none animate-pulse bg-muted/30'
      )}
      style={{ height: `${HOUR_HEIGHT}px` }}
    >
      {/* 30-minute clickable intervals */}
      {[0, 1].map((halfIndex) => (
        <button
          key={halfIndex}
          type="button"
          onClick={() => handleHalfHourClick(halfIndex)}
          className="absolute inset-x-0 cursor-pointer transition-colors hover:bg-accent/50"
          style={{
            top: `${halfIndex * 50}%`,
            height: '50%',
          }}
          aria-label={`${hour.toString().padStart(2, '0')}:${(halfIndex * 30).toString().padStart(2, '0')}`}
        />
      ))}

      {/* Half hour line - custom dash pattern */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, var(--color-muted-foreground) 0, var(--color-muted-foreground) 8px, transparent 4px, transparent 12px)',
          opacity: 0.2,
        }}
      />
    </div>
  );
}
