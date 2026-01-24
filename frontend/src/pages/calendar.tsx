import { Container } from '@/components/layout/container';
import {
  CalendarHeader,
  DayView,
  EventDialog,
  MonthView,
  WeekView,
  useCalendarStore,
} from '@/features/calendar';

export default function CalendarPage() {
  const { selectedView, isEventDialogOpen, selectedEvent, defaultDate, closeEventDialog } =
    useCalendarStore();

  return (
    <Container className="flex flex-1 flex-col">
      <CalendarHeader />

      <div className="flex flex-1 flex-col overflow-hidden rounded-b-lg border border-t-0 bg-card">
        {selectedView === 'month' && <MonthView />}
        {selectedView === 'week' && <WeekView />}
        {selectedView === 'day' && <DayView />}
      </div>

      <EventDialog
        open={isEventDialogOpen}
        onOpenChange={(open) => !open && closeEventDialog()}
        event={selectedEvent ?? undefined}
        defaultDate={defaultDate ?? undefined}
      />
    </Container>
  );
}
