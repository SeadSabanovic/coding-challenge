import { format } from 'date-fns';

import { useCalendarStore } from '../../store/calendar-store';
import { Button } from '@/components/ui/button';

export function TodayButton() {
  const { setSelectedDate } = useCalendarStore();

  const today = new Date();

  const handleClick = () => {
    setSelectedDate(today);
  };

  return (
    <Button variant="outline" onClick={handleClick} aria-label="Go to today">
      <p className="text-sm text-muted-foreground">{format(today, 'MMM').toUpperCase()}</p>
      <p className="flex w-full items-center justify-center text-lg font-bold">{today.getDate()}</p>
    </Button>
  );
}
