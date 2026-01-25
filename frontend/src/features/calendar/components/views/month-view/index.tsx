import { useMemo } from 'react';
import { startOfDay, endOfDay } from 'date-fns';

import { useCalendarStore } from '../../../store/calendar-store';
import { useEvents } from '../../../hooks/use-events';
import { getCalendarCells } from '../../../utils/helpers';
import { DayCell } from './day-cell';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function MonthView() {
  const { selectedDate } = useCalendarStore();

  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate]);
  const numberOfWeeks = cells.length / 7;

  // Calculate date range for all visible cells (includes overflow days)
  const dateRange = useMemo(() => {
    const firstCell = cells[0];
    const lastCell = cells[cells.length - 1];
    return {
      from: startOfDay(firstCell.date).toISOString(),
      to: endOfDay(lastCell.date).toISOString(),
    };
  }, [cells]);

  const { data: events = [], isLoading } = useEvents(dateRange);

  return (
    <div className="relative flex-1">
      <div className="absolute inset-0 flex flex-col overflow-auto">
        {/* Week days header - sticky */}
        <div className="sticky top-0 z-10 grid grid-cols-[repeat(7,minmax(100px,1fr))] bg-card">
          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="flex items-center justify-center border-r border-b py-2 last:border-r-0"
            >
              <span className="text-xs font-medium text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div
          className="grid flex-1 grid-cols-[repeat(7,minmax(100px,1fr))]"
          style={{ gridTemplateRows: `repeat(${numberOfWeeks}, minmax(auto, 1fr))` }}
        >
          {cells.map((cell, index) => (
            <DayCell
              key={cell.date.toISOString()}
              cell={cell}
              events={events}
              isLastRow={index >= cells.length - 7}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
