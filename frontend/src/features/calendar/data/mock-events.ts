import type { CalendarEvent } from '../types';

// Helper to create date in local timezone
const createDate = (daysOffset: number, hours: number, minutes: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

export const MOCK_EVENTS: CalendarEvent[] = [
  // Today's events
  {
    id: '1',
    title: 'Team Standup',
    startDate: createDate(0, 9, 0),
    endDate: createDate(0, 9, 30),
    color: 'blue',
    description: 'Daily team sync meeting',
  },
  {
    id: '2',
    title: 'Project Review',
    startDate: createDate(0, 11, 0),
    endDate: createDate(0, 12, 30),
    color: 'green',
    description: 'Review Q1 project progress',
  },
  {
    id: '3',
    title: 'Lunch with Client',
    startDate: createDate(0, 13, 0),
    endDate: createDate(0, 14, 0),
    color: 'yellow',
  },
  {
    id: '4',
    title: 'Code Review',
    startDate: createDate(0, 15, 0),
    endDate: createDate(0, 16, 0),
    color: 'purple',
  },

  // Tomorrow's events
  {
    id: '5',
    title: 'Sprint Planning',
    startDate: createDate(1, 10, 0),
    endDate: createDate(1, 11, 30),
    color: 'blue',
  },
  {
    id: '6',
    title: 'Design Review',
    startDate: createDate(1, 14, 0),
    endDate: createDate(1, 15, 0),
    color: 'orange',
  },

  // Day after tomorrow
  {
    id: '7',
    title: 'Client Meeting',
    startDate: createDate(2, 9, 0),
    endDate: createDate(2, 10, 30),
    color: 'red',
  },
  {
    id: '8',
    title: 'Training Session',
    startDate: createDate(2, 13, 0),
    endDate: createDate(2, 15, 0),
    color: 'green',
  },

  // Yesterday
  {
    id: '9',
    title: 'Interview',
    startDate: createDate(-1, 11, 0),
    endDate: createDate(-1, 12, 0),
    color: 'purple',
  },

  // Few days ago
  {
    id: '10',
    title: 'Workshop',
    startDate: createDate(-3, 9, 0),
    endDate: createDate(-3, 12, 0),
    color: 'blue',
  },
];

