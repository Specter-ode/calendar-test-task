import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ISODateString, ITask } from '@/types/calendar';
import initialTaskByDate from './initialTaskByDate.json';
export interface ITasksState {
	tasksByDate: Record<ISODateString, ITask[]>;
	searchQuery: string;
}

const initialState: ITasksState = {
	tasksByDate: initialTaskByDate,
	searchQuery: '',
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, { payload }: PayloadAction<ITask>) => {
			if (!state.tasksByDate[payload.date]) {
				state.tasksByDate[payload.date] = [];
			}
			state.tasksByDate[payload.date].push(payload);
		},

		updateDayTasks: (state, { payload }: PayloadAction<Record<ISODateString, ITask[]>>) => {
			state.tasksByDate = {
				...state.tasksByDate,
				...payload,
			};
		},

		editTask: (state, { payload }: PayloadAction<ITask>) => {
			if (!state.tasksByDate[payload.date]) return;
			state.tasksByDate[payload.date] = state.tasksByDate[payload.date].map(task =>
				task.id === payload.id ? payload : task
			);
		},

		deleteTask: (state, { payload }: PayloadAction<ITask>) => {
			if (!state.tasksByDate[payload.date]) return;
			state.tasksByDate[payload.date] = state.tasksByDate[payload.date].filter(
				task => task.id !== payload.id
			);
		},

		setSearchQuery: (state, { payload }: PayloadAction<string>) => {
			state.searchQuery = payload;
		},
	},
});

export const { addTask, updateDayTasks, editTask, deleteTask, setSearchQuery } = tasksSlice.actions;
export default tasksSlice.reducer;
