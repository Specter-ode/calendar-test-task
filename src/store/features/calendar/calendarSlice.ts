import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ISelectedDate } from '@/types/calendar';
import { CalendarViewType } from '@/types/calendar';
import { getInitialSelectedDate } from '@/utils/date';

interface ICalendarState {
	selectedDate: ISelectedDate;
	calendarType: CalendarViewType;
}

const initialState: ICalendarState = {
	selectedDate: getInitialSelectedDate(),
	calendarType: CalendarViewType.Month,
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setSelectedDate: (state, { payload }: PayloadAction<ISelectedDate>) => {
			state.selectedDate = payload;
		},
		setCalendarType: (state, { payload }: PayloadAction<CalendarViewType>) => {
			state.calendarType = payload;
		},
	},
});

export const { setSelectedDate, setCalendarType } = calendarSlice.actions;
export default calendarSlice.reducer;
