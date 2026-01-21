import { Container } from '@/components/layout/container';
import { CalendarHeader, useCalendarStore } from '@/features/calendar';

export default function CalendarPage() {
  const { selectedView } = useCalendarStore();

  return (
    <Container className="flex-1 flex flex-col">
      {/* Calendar Header with navigation and view toggle */}
      <CalendarHeader />

      {/* Calendar View - placeholder for now */}
      <div className="rounded-b-lg border border-t-0 bg-card p-8 flex-1">
        <div className="flex items-center justify-center">
          <p className="text-muted-foreground">
            {selectedView === 'day' && 'Day View - Coming soon'}
            {selectedView === 'week' && 'Week View - Coming soon'}
            {selectedView === 'month' && 'Month View - Coming soon'}
          </p>
        </div>
      </div>
    </Container>
  );
}
