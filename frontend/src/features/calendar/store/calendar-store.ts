import { create } from 'zustand';

import type { CalendarEvent, CalendarView } from '../types';

interface CalendarState {
  // View state
  selectedView: CalendarView;
  selectedDate: Date;

  // Dialog state
  isEventDialogOpen: boolean;
  selectedEvent: CalendarEvent | null;
  defaultDate: Date | null;

  // Actions
  setSelectedView: (view: CalendarView) => void;
  setSelectedDate: (date: Date) => void;
  openEventDialog: (event?: CalendarEvent, defaultDate?: Date) => void;
  closeEventDialog: () => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  // Initial state
  selectedView: 'week',
  selectedDate: new Date(),
  isEventDialogOpen: false,
  selectedEvent: null,
  defaultDate: null,

  // Actions
  setSelectedView: (view) => set({ selectedView: view }),
  setSelectedDate: (date) => set({ selectedDate: date }),

  openEventDialog: (event, defaultDate) =>
    set({
      isEventDialogOpen: true,
      selectedEvent: event || null,
      defaultDate: defaultDate || null,
    }),

  closeEventDialog: () =>
    set({
      isEventDialogOpen: false,
      selectedEvent: null,
      defaultDate: null,
    }),
}));
