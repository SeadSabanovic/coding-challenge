import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CalendarEvent, CalendarView } from '../types';

type CalendarDomainState = {
  selectedView: CalendarView;
  selectedDate: Date;
};

type CalendarUiState = {
  isEventDialogOpen: boolean;
  selectedEvent: CalendarEvent | null;
  defaultDate: Date | null;
};

type CalendarActions = {
  setSelectedView: (view: CalendarView) => void;
  setSelectedDate: (date: Date) => void;
  openEventDialog: (event?: CalendarEvent, defaultDate?: Date) => void;
  closeEventDialog: () => void;
};

type CalendarState = CalendarDomainState & CalendarUiState & CalendarActions;

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      // Initial state
      selectedView: 'week',
      selectedDate: new Date(),
      isEventDialogOpen: false,
      selectedEvent: null,
      defaultDate: null,

      // Actions
      setSelectedView: (view) =>
        set((state) =>
          state.selectedView === view
            ? state
            : {
                selectedView: view,
                selectedDate: new Date(),
              }
        ),
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
    }),
    {
      name: 'calendar-store',
      partialize: (state) => ({ selectedView: state.selectedView }),
    }
  )
);
