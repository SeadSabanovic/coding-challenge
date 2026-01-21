import { create } from 'zustand';

import type { CalendarView } from '../types';

interface CalendarState {
  // View state
  selectedView: CalendarView;
  selectedDate: Date;

  // Actions
  setSelectedView: (view: CalendarView) => void;
  setSelectedDate: (date: Date) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  // Initial state
  selectedView: 'week',
  selectedDate: new Date(),

  // Actions
  setSelectedView: (view) => set({ selectedView: view }),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
