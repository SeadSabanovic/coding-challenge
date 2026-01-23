// Calendar view types
export type CalendarView = 'day' | 'week' | 'month';

// Event color options
export type EventColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange';

// Calendar event interface
export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string; // ISO string in UTC
  endDate: string; // ISO string in UTC
  timezone: string; // IANA timezone (e.g., 'Europe/London')
  color: EventColor;
  description?: string;
}

// Calendar cell for month view grid
export interface CalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}
