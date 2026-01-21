import { useMemo } from 'react';

import { useCalendarStore } from '../../../store/calendar-store';
import { getCalendarCells } from '../../../utils/helpers';
import { DayCell } from './day-cell';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function MonthView() {
  const { selectedDate } = useCalendarStore();

  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate]);
  const numberOfWeeks = cells.length / 7;

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
              isLastRow={index >= cells.length - 7}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
