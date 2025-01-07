import {
	addMonths,
	subMonths,
	addWeeks,
	subWeeks,
	startOfWeek,
	endOfWeek,
	startOfMonth,
	format,
} from 'date-fns';
import type { ISelectedDate, ISODateString } from '@/types/calendar';

export const toISODateString = (date: Date): ISODateString => {
	return format(date, 'yyyy-MM-dd') as ISODateString;
};
export const getWeekStart = (date: Date): ISODateString => {
	return toISODateString(startOfWeek(date, { weekStartsOn: 1 }));
};

export const getWeekEnd = (weekStart: ISODateString): ISODateString => {
	return toISODateString(endOfWeek(new Date(weekStart), { weekStartsOn: 1 }));
};

export const moveToNextMonth = (date: ISelectedDate): ISelectedDate => {
	const newDate = addMonths(new Date(date.year, date.month), 1);
	const monthStart = startOfMonth(newDate);
	const weekStart = getWeekStart(monthStart);

	return {
		month: newDate.getMonth(),
		year: newDate.getFullYear(),
		weekStart,
		weekEnd: getWeekEnd(weekStart),
	};
};

export const moveToPrevMonth = (date: ISelectedDate): ISelectedDate => {
	const newDate = subMonths(new Date(date.year, date.month), 1);
	const monthStart = startOfMonth(newDate);
	const weekStart = getWeekStart(monthStart);

	return {
		month: newDate.getMonth(),
		year: newDate.getFullYear(),
		weekStart,
		weekEnd: getWeekEnd(weekStart),
	};
};

export const moveToNextWeek = (date: ISelectedDate): ISelectedDate => {
	const newWeekStart = toISODateString(addWeeks(new Date(date.weekStart), 1));

	return {
		month: new Date(newWeekStart).getMonth(),
		year: new Date(newWeekStart).getFullYear(),
		weekStart: newWeekStart,
		weekEnd: getWeekEnd(newWeekStart),
	};
};

export const moveToPrevWeek = (date: ISelectedDate): ISelectedDate => {
	const newWeekStart = toISODateString(subWeeks(date.weekStart, 1));

	return {
		month: new Date(newWeekStart).getMonth(),
		year: new Date(newWeekStart).getFullYear(),
		weekStart: newWeekStart,
		weekEnd: getWeekEnd(newWeekStart),
	};
};

export const getInitialSelectedDate = (): ISelectedDate => {
	const currentDate = new Date();
	const weekStart = getWeekStart(currentDate);
	return {
		month: currentDate.getMonth(),
		year: currentDate.getFullYear(),
		weekStart: weekStart,
		weekEnd: getWeekEnd(weekStart),
	};
};
