import type { RootState } from '@/store/store';

export const getTasks = (state: RootState) => state.tasks.tasksByDate;
export const getSearchQuery = (state: RootState) => state.tasks.searchQuery;
