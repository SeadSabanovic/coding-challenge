import { useMemo } from 'react';
import { format, startOfWeek, endOfWeek, addDays, isToday } from 'date-fns';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';
import { useCalendarStore } from '../../../store/calendar-store';
import { useEvents } from '../../../hooks/use-events';
import { getEventsForDay, getEventTopPixels } from '../../../utils/helpers';
import { CurrentTimeLine, EventBlock, HoursColumn, TimeSlot } from '../shared';

export function WeekView() {
  const { selectedDate } = useCalendarStore();

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const weekStart = useMemo(() => startOfWeek(selectedDate, { weekStartsOn: 1 }), [selectedDate]);
  const weekEnd = useMemo(() => endOfWeek(selectedDate, { weekStartsOn: 1 }), [selectedDate]);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Calculate date range for the week
  const dateRange = useMemo(
    () => ({
      from: weekStart.toISOString(),
      to: weekEnd.toISOString(),
    }),
    [weekStart, weekEnd]
  );

  const { data: events = [], isLoading } = useEvents(dateRange);

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
            {(() => {
              let globalIndex = 0;
              return weekDays.map((day) => {
                const dayEvents = getEventsForDay(events, day);

                return (
                  <div key={day.toISOString()} className="relative border-l first:border-l-0">
                    {/* Hour slots */}
                    {hours.map((hour, index) => (
                      <TimeSlot
                        key={hour}
                        date={day}
                        hour={hour}
                        isLast={index === hours.length - 1}
                        isLoading={isLoading}
                      />
                    ))}

                    {/* Events with staggered entrance animation */}
                    {dayEvents.map((event) => {
                      const currentIndex = globalIndex++;
                      return (
                        <motion.div
                          key={event.id}
                          className="absolute inset-x-0"
                          style={{ top: `${getEventTopPixels(event)}px` }}
                          initial={{ opacity: 0, scale: 0.95, y: -8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{
                            duration: 0.2,
                            delay: currentIndex * 0.08,
                            ease: 'easeOut',
                          }}
                        >
                          <EventBlock event={event} />
                        </motion.div>
                      );
                    })}
                  </div>
                );
              });
            })()}

            {/* Current time line */}
            {hasToday && <CurrentTimeLine />}
          </div>
        </div>
      </div>
    </div>
  );
}
