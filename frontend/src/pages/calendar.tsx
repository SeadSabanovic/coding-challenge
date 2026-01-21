import { Container } from '@/components/layout/container';
import { CalendarHeader, DayView, MonthView, useCalendarStore } from '@/features/calendar';

export default function CalendarPage() {
  const { selectedView } = useCalendarStore();

  return (
    <Container className="flex flex-1 flex-col">
      {/* Calendar Header with navigation and view toggle */}
      <CalendarHeader />

      {/* Calendar View */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-b-lg border border-t-0 bg-card">
        {selectedView === 'month' && <MonthView />}
        {selectedView === 'week' && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">Week View - Coming soon</p>
          </div>
        )}
        {selectedView === 'day' && <DayView />}
      </div>
    </Container>
  );
}
