// Calendar view types
export type CalendarView = 'day' | 'week' | 'month';

// Calendar cell for month view grid
export interface CalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}
