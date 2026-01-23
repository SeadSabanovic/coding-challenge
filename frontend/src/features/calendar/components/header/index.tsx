import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { TodayButton } from './today-button';
import { DateNavigator } from './date-navigator';
import { ViewToggle } from './view-toggle';
import { EventDialog } from '../event-dialog';

export function CalendarHeader() {
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 rounded-t-lg border bg-card p-4 lg:flex-row lg:items-end lg:justify-between">
        {/* Left side: Today button + Date navigator */}
        <div className="flex items-center gap-3">
          <TodayButton />
          <DateNavigator />
        </div>

        {/* Right side: View toggle + Add event button */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <ViewToggle />

          <Button className="w-full sm:w-auto" onClick={() => setIsEventDialogOpen(true)}>
            <Plus className="size-4" />
            Add Event
          </Button>
        </div>
      </div>

      <EventDialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen} />
    </>
  );
}
