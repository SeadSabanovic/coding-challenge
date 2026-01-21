import { format } from 'date-fns';

import { useCalendarStore } from '../../store/calendar-store';

export function TodayButton() {
  const { setSelectedDate } = useCalendarStore();

  const today = new Date();

  const handleClick = () => {
    setSelectedDate(today);
  };

  return (
    <button
      className="flex size-14 flex-col items-start overflow-hidden rounded-lg border transition-colors hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
      onClick={handleClick}
      aria-label="Go to today"
    >
      <p className="flex h-6 w-full items-center justify-center bg-destructive text-center text-xs font-semibold text-primary-foreground">
        {format(today, 'MMM').toUpperCase()}
      </p>
      <p className="flex w-full items-center justify-center text-lg font-bold">{today.getDate()}</p>
    </button>
  );
}
