import { create } from 'zustand';

import { MOCK_EVENTS } from '../data/mock-events';

import type { CalendarEvent, CalendarView } from '../types';

interface CalendarState {
  // View state
  selectedView: CalendarView;
  selectedDate: Date;

  // Events
  events: CalendarEvent[];

  // Dialog state
  isEventDialogOpen: boolean;
  selectedEvent: CalendarEvent | null;
  defaultDate: Date | null;

  // Actions
  setSelectedView: (view: CalendarView) => void;
  setSelectedDate: (date: Date) => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  openEventDialog: (event?: CalendarEvent, defaultDate?: Date) => void;
  closeEventDialog: () => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  // Initial state
  selectedView: 'week',
  selectedDate: new Date(),
  events: MOCK_EVENTS,
  isEventDialogOpen: false,
  selectedEvent: null,
  defaultDate: null,

  // Actions
  setSelectedView: (view) => set({ selectedView: view }),
  setSelectedDate: (date) => set({ selectedDate: date }),

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  updateEvent: (id, updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      ),
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),

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
