export type ISODateString = string & { __isoDateString: true }; // "YYYY-MM-DD"

export interface ITask {
	id: string;
	name: string;
	date: ISODateString;
	position: number;
}

export interface IHoliday {
	id: string;
	date: ISODateString;
	name: string;
	global: boolean;
}

export type IDay = {
	date: ISODateString;
	tasks: ITask[];
	holidays: IHoliday[];
	isDisabled: boolean;
};

export interface ISelectedDate {
	month: number;
	year: number;
	weekStart: ISODateString;
	weekEnd: ISODateString;
}

export enum CalendarViewType {
	Month = 'Month',
	Week = 'Week',
}

export enum TaskFormModeType {
	Closed,
	Add,
	Edit,
}
