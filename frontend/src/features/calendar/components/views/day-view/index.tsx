import { useCalendarStore } from '../../../store/calendar-store';
import { getEventsForDay, getEventTopPixels } from '../../../utils/helpers';
import { CurrentTimeLine, EventBlock, HoursColumn, TimeSlot } from '../shared';

export function DayView() {
  const { selectedDate, events } = useCalendarStore();

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const dayEvents = getEventsForDay(events, selectedDate);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Time grid container */}
      <div className="relative flex-1">
        <div className="absolute inset-0 flex overflow-auto">
          {/* Hours column */}
          <HoursColumn hours={hours} className="relative w-16 shrink-0" />

          {/* Day column */}
          <div className="relative flex-1">
            {/* Hour slots */}
            {hours.map((hour, index) => (
              <TimeSlot key={hour} date={selectedDate} hour={hour} isLast={index === hours.length - 1} />
            ))}

            {/* Events */}
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="absolute inset-x-0"
                style={{ top: `${getEventTopPixels(event)}px` }}
              >
                <EventBlock event={event} />
              </div>
            ))}

            {/* Current time line */}
            {isToday && <CurrentTimeLine />}
          </div>
        </div>
      </div>
    </div>
  );
}
