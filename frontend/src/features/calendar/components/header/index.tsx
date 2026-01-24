import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useCalendarStore } from '../../store/calendar-store';
import { TodayButton } from './today-button';
import { DateNavigator } from './date-navigator';
import { ViewToggle } from './view-toggle';

export function CalendarHeader() {
  const openEventDialog = useCalendarStore((state) => state.openEventDialog);

  return (
    <div className="flex flex-col gap-4 rounded-t-lg border bg-card p-4 md:flex-row md:items-end md:justify-between">
      {/* Left side: Today button + Date navigator */}
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <TodayButton />
        <DateNavigator />
      </div>

      {/* Right side: View toggle + Add event button */}
      <div className="flex items-center gap-3 sm:justify-end">
        <ViewToggle />

        <Button className="flex-1 sm:flex-none" onClick={() => openEventDialog()}>
          <Plus />
          Add Event
        </Button>
      </div>
    </div>
  );
}
