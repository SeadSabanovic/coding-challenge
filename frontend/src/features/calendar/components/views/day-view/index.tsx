import { format } from 'date-fns';

import { useCalendarStore } from '../../../store/calendar-store';
import { CurrentTimeLine } from './current-time-line';

const HOUR_HEIGHT = 60; // pixels per hour

export function DayView() {
  const { selectedDate } = useCalendarStore();

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Time grid container */}
      <div className="relative flex-1">
        <div className="absolute inset-0 flex overflow-auto">
          {/* Hours column */}
          <div className="relative w-16 shrink-0">
            {hours.map((hour, index) => (
              <div key={hour} className="relative border-r" style={{ height: `${HOUR_HEIGHT}px` }}>
                {index !== 0 && (
                  <span className="absolute -top-2.5 right-2 text-xs text-muted-foreground">
                    {format(new Date().setHours(hour, 0, 0, 0), 'HH:mm')}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Day column */}
          <div className="relative flex-1">
            {/* Hour slots */}
            {hours.map((hour) => (
              <div
                key={hour}
                className="relative border-b border-dashed last:border-b-0"
                style={{ height: `${HOUR_HEIGHT}px` }}
              >
                {/* Clickable area for adding events */}
                <div className="absolute inset-0 cursor-pointer transition-colors hover:bg-accent/50" />

                {/* Half hour line */}
                <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dotted border-muted-foreground/20" />
              </div>
            ))}

            {/* Current time line */}
            {isToday && <CurrentTimeLine />}

            {/* Events will be rendered here */}
          </div>
        </div>
      </div>
    </div>
  );
}
