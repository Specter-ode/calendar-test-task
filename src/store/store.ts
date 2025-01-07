import { configureStore } from '@reduxjs/toolkit';

import calendarReducer from './features/calendar/calendarSlice';
import tasksReducer from './features/tasks/tasksSlice';

export const store = configureStore({
	reducer: {
		calendar: calendarReducer,
		tasks: tasksReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
