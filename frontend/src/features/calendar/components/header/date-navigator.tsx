import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCalendarStore } from '../../store/calendar-store';
import { getRangeText, navigateDate } from '../../utils/helpers';

export function DateNavigator() {
  const { selectedDate, selectedView, setSelectedDate } = useCalendarStore();

  const month = format(selectedDate, 'MMMM');
  const year = selectedDate.getFullYear();

  const handlePrevious = () => {
    setSelectedDate(navigateDate(selectedDate, selectedView, 'previous'));
  };

  const handleNext = () => {
    setSelectedDate(navigateDate(selectedDate, selectedView, 'next'));
  };

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">
          {month} {year}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="size-7"
          onClick={handlePrevious}
          aria-label="Previous"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <p className="min-w-48 text-center text-sm text-muted-foreground">
          {getRangeText(selectedView, selectedDate)}
        </p>

        <Button
          variant="outline"
          size="icon"
          className="size-7"
          onClick={handleNext}
          aria-label="Next"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
