import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import type { IDay, ISelectedDate, ITask, ISODateString, IHoliday } from '@/types/calendar';
import { CalendarViewType } from '@/types/calendar';
import { toISODateString } from './date';

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const isISODateString = (value: string): value is ISODateString => {
	return isoDateRegex.test(value);
};

export const createCalendarDays = (
	selectedDate: ISelectedDate,
	calendarType: CalendarViewType
): IDay[] => {
	if (calendarType === CalendarViewType.Week) {
		return eachDayOfInterval({
			start: selectedDate.weekStart,
			end: selectedDate.weekEnd,
		}).map(date => ({
			date: toISODateString(date),
			tasks: [],
			holidays: [],
			isDisabled: false,
		}));
	}

	const monthStart = startOfMonth(new Date(selectedDate.year, selectedDate.month));
	const monthEnd = endOfMonth(monthStart);
	const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
	const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

	return eachDayOfInterval({ start: calendarStart, end: calendarEnd }).map(date => ({
		date: toISODateString(date),
		tasks: [],
		holidays: [],
		isDisabled: date.getMonth() !== selectedDate.month,
	}));
};

export const addTasksToDays = (
	days: IDay[],
	tasksByDate: Record<ISODateString, ITask[]>
): IDay[] => {
	return days.map(day => ({
		...day,
		tasks: tasksByDate[day.date] || [],
	}));
};
export const addHolidaysToDays = (days: IDay[], holidays: IHoliday[]): IDay[] => {
	const holidaysByDate = holidays.reduce<Record<ISODateString, IHoliday[]>>((acc, holiday) => {
		if (!acc[holiday.date]) {
			acc[holiday.date] = [];
		}
		acc[holiday.date].push(holiday);
		return acc;
	}, {});

	return days.map(day => ({
		...day,
		holidays: holidaysByDate[day.date] || [],
	}));
};

export const addDataToDays = (
	days: IDay[],
	tasksByDate: Record<ISODateString, ITask[]>,
	holidaysByDate: Record<ISODateString, IHoliday[]>
): IDay[] => {
	return days.map(day => ({
		...day,
		holidays: holidaysByDate[day.date] || [],
		tasks: tasksByDate[day.date] || [],
	}));
};
