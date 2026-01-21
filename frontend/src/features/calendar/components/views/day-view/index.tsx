import { useCalendarStore } from '../../../store/calendar-store';
import { HoursColumn, TimeSlot } from '../shared';
import { CurrentTimeLine } from './current-time-line';

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
          <HoursColumn hours={hours} className="relative w-16 shrink-0 border-r" />

          {/* Day column */}
          <div className="relative flex-1">
            {/* Hour slots */}
            {hours.map((hour) => (
              <TimeSlot key={hour} />
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
