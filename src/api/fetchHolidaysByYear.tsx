import axios from 'axios';
import type { IHoliday, ISODateString } from '@/types/calendar';
import { nanoid } from '@reduxjs/toolkit';
const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchHolidaysByYear = async (
	year: number
): Promise<Record<ISODateString, IHoliday[]>> => {
	const response = await axios.get<IHoliday[]>(`${baseUrl}/PublicHolidays/${year}/UA`);
	return response.data.reduce<Record<ISODateString, IHoliday[]>>((acc, holiday) => {
		if (!acc[holiday.date]) {
			acc[holiday.date] = [];
		}
		const holidayData = {
			id: nanoid(),
			date: holiday.date,
			name: holiday.name,
			global: holiday.global,
		};
		acc[holiday.date].push(holidayData);

		return acc;
	}, {});
};
