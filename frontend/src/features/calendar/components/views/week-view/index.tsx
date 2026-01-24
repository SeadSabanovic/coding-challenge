import { format, startOfWeek, addDays, isToday } from 'date-fns';

import { cn } from '@/lib/utils';
import { useCalendarStore } from '../../../store/calendar-store';
import { getEventsForDay, getEventTopPixels } from '../../../utils/helpers';
import { CurrentTimeLine, EventBlock, HoursColumn, TimeSlot } from '../shared';

export function WeekView() {
  const { selectedDate, events } = useCalendarStore();

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const hasToday = weekDays.some((day) => isToday(day));

  return (
    <div className="relative flex-1">
      <div className="absolute inset-0 flex flex-col overflow-auto">
        {/* Week header - sticky */}
        <div className="sticky top-0 z-30 flex">
          <div className="w-16 shrink-0 border-r border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60" />
          <div className="grid flex-1 grid-cols-[repeat(7,minmax(100px,1fr))]">
            {weekDays.map((day) => (
              <div
                key={day.toISOString()}
                className={cn(
                  'flex items-center justify-center gap-2 border-b border-l bg-background/95 py-2 backdrop-blur first:border-l-0 supports-backdrop-filter:bg-background/60',
                  isToday(day) && 'bg-primary! text-primary-foreground'
                )}
              >
                <span
                  className={cn(
                    'text-xs font-medium',
                    isToday(day) && 'text-primary-foreground/80'
                  )}
                >
                  {format(day, 'EEE')}
                </span>
                <span className="flex items-center justify-center rounded-full text-sm font-semibold">
                  {format(day, 'd')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Time grid */}
        <div className="flex flex-1">
          {/* Hours column */}
          <HoursColumn hours={hours} className="relative w-16 shrink-0" />

          {/* Week grid */}
          <div className="relative grid flex-1 grid-cols-[repeat(7,minmax(100px,1fr))]">
            {weekDays.map((day) => {
              const dayEvents = getEventsForDay(events, day);

              return (
                <div key={day.toISOString()} className="relative border-l first:border-l-0">
                  {/* Hour slots */}
                  {hours.map((hour, index) => (
                    <TimeSlot key={hour} date={day} hour={hour} isLast={index === hours.length - 1} />
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
                </div>
              );
            })}

            {/* Current time line */}
            {hasToday && <CurrentTimeLine />}
          </div>
        </div>
      </div>
    </div>
  );
}
