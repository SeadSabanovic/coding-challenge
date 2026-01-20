import CalendarComponent from '@/pages/calendar';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/calendar/')({
  component: CalendarComponent,
});
