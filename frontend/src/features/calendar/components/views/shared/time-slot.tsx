import { setHours, setMinutes } from 'date-fns';

import { HOUR_HEIGHT } from '../../../constants';
import { useCalendarStore } from '../../../store/calendar-store';

interface TimeSlotProps {
  date: Date;
  hour: number;
}

export function TimeSlot({ date, hour }: TimeSlotProps) {
  const openEventDialog = useCalendarStore((state) => state.openEventDialog);

  const handleHalfHourClick = (halfIndex: number) => {
    const minutes = halfIndex * 30;
    const selectedTime = setMinutes(setHours(date, hour), minutes);
    openEventDialog(undefined, selectedTime);
  };

  return (
    <div
      className="relative border-b border-dashed last:border-b-0"
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

      {/* Half hour line */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dotted border-muted-foreground/20" />
    </div>
  );
}
