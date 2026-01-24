import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCalendarStore } from '../../store/calendar-store';
import { getRangeText, navigateDate } from '../../utils/helpers';

export function DateNavigator() {
  const { selectedDate, selectedView, setSelectedDate } = useCalendarStore();

  const handlePrevious = () => {
    setSelectedDate(navigateDate(selectedDate, selectedView, 'previous'));
  };

  const handleNext = () => {
    setSelectedDate(navigateDate(selectedDate, selectedView, 'next'));
  };

  return (
    <div className="order-1 flex w-full flex-1 items-center gap-2 sm:order-0 md:w-fit">
      <Button variant="outline" size="icon" onClick={handlePrevious} aria-label="Previous">
        <ChevronLeft className="size-4" />
      </Button>

      <p className="min-w-48 flex-1 text-center text-sm text-muted-foreground">
        {getRangeText(selectedView, selectedDate)}
      </p>

      <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next">
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
