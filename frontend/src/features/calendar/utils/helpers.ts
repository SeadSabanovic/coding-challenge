import {
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  format,
} from 'date-fns';

import type { CalendarView } from '../types';

/**
 * Get range text based on view and selected date
 */
export function getRangeText(view: CalendarView, date: Date): string {
  const formatString = 'MMM d, yyyy';

  switch (view) {
    case 'month': {
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      return `${format(start, formatString)} - ${format(end, formatString)}`;
    }
    case 'week': {
      const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday start
      const end = endOfWeek(date, { weekStartsOn: 1 });
      return `${format(start, formatString)} - ${format(end, formatString)}`;
    }
    case 'day':
      return format(date, formatString);
    default:
      return '';
  }
}

/**
 * Navigate date based on view and direction
 */
export function navigateDate(date: Date, view: CalendarView, direction: 'previous' | 'next'): Date {
  const operations = {
    month: direction === 'next' ? addMonths : subMonths,
    week: direction === 'next' ? addWeeks : subWeeks,
    day: direction === 'next' ? addDays : subDays,
  };

  return operations[view](date, 1);
}
