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
  parseISO,
  isSameDay,
} from 'date-fns';

import { HOUR_HEIGHT } from '../constants';

import type { CalendarCell, CalendarEvent, CalendarView } from '../types';

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

/**
 * Generate calendar cells for month view (Monday-first weeks)
 */
export function getCalendarCells(selectedDate: Date): CalendarCell[] {
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    // Convert to Monday-first (Mon=0, Sun=6)
    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);
  const totalDays = firstDayOfMonth + daysInMonth;

  // Previous month cells
  const prevMonthCells: CalendarCell[] = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    day: daysInPrevMonth - firstDayOfMonth + i + 1,
    currentMonth: false,
    date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - firstDayOfMonth + i + 1),
  }));

  // Current month cells
  const currentMonthCells: CalendarCell[] = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    currentMonth: true,
    date: new Date(currentYear, currentMonth, i + 1),
  }));

  // Next month cells (fill remaining to complete the grid)
  const remainingDays = (7 - (totalDays % 7)) % 7;
  const nextMonthCells: CalendarCell[] = Array.from({ length: remainingDays }, (_, i) => ({
    day: i + 1,
    currentMonth: false,
    date: new Date(currentYear, currentMonth + 1, i + 1),
  }));

  return [...prevMonthCells, ...currentMonthCells, ...nextMonthCells];
}

/**
 * Get events for a specific day
 */
export function getEventsForDay(events: CalendarEvent[], date: Date): CalendarEvent[] {
  return events.filter((event) => isSameDay(parseISO(event.startDate), date));
}

/**
 * Calculate event top position in pixels
 */
export function getEventTopPixels(event: CalendarEvent): number {
  const start = parseISO(event.startDate);
  const startMinutes = start.getHours() * 60 + start.getMinutes();
  return (startMinutes / 60) * HOUR_HEIGHT;
}
