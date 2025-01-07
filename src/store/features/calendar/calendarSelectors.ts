import type { RootState } from '@/store/store';

export const getCalendarState = (state: RootState) => state.calendar;
export const getSelectedDate = (state: RootState) => state.calendar.selectedDate;
export const getCalendarType = (state: RootState) => state.calendar.calendarType;
