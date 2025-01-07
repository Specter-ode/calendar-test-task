import { useAppSelector } from '@/store/hooks';
import { getCalendarState } from '@/store/features/calendar/calendarSelectors';
import Header from '@/components/Header/Header';
import { getTasks } from '@/store/features/tasks/tasksSelectors';
import { useEffect, useMemo, useState } from 'react';
import { addDataToDays, createCalendarDays } from '@/utils/calendar';
import Calendar from '@/components/Calendar/Calendar';
import Loader from '@/components/Loader/Loader';
import type { IHoliday, ISODateString } from '@/types/calendar';
import { fetchHolidaysByYear } from './api/fetchHolidaysByYear';

const App: React.FC = () => {
	const { selectedDate, calendarType } = useAppSelector(getCalendarState);
	const tasksByDate = useAppSelector(getTasks);

	const [holidaysByDate, setHolidaysByDate] = useState<Record<ISODateString, IHoliday[]>>({});
	const [loadedYears, setLoadedYears] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const calendarDays = useMemo(
		() => createCalendarDays(selectedDate, calendarType),
		[calendarType, selectedDate]
	);

	const yearsToLoad = useMemo(() => {
		if (calendarDays.length === 0) return [];

		const yearOfStartDate = new Date(calendarDays[0].date).getFullYear();
		const yearOfEndDate = new Date(calendarDays[calendarDays.length - 1].date).getFullYear();
		const yearsInRange =
			yearOfStartDate === yearOfEndDate ? [yearOfStartDate] : [yearOfStartDate, yearOfEndDate];
		return yearsInRange.filter(year => !loadedYears.includes(year));
	}, [calendarDays, loadedYears]);

	const daysWithData = useMemo(() => {
		return addDataToDays(calendarDays, tasksByDate, holidaysByDate);
	}, [calendarDays, tasksByDate, holidaysByDate]);

	const handleGetHolidays = (yearsToLoad: number[]): void => {
		setIsLoading(true);
		Promise.allSettled(
			yearsToLoad.map(year =>
				fetchHolidaysByYear(year).then(data => ({
					year,
					data,
				}))
			)
		)
			.then(results => {
				const newHolidaysData: Record<ISODateString, IHoliday[]> = {};

				const newlyLoadedYears: number[] = [];

				results.forEach(result => {
					if (result.status === 'fulfilled') {
						Object.assign(newHolidaysData, result.value.data);
						newlyLoadedYears.push(result.value.year);
					} else {
						console.error(`Failed to load holidays for year: ${result.reason}`);
					}
				});

				setHolidaysByDate(prev => ({ ...prev, ...newHolidaysData }));
				setLoadedYears(prev => [...prev, ...newlyLoadedYears]);
			})
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		if (yearsToLoad.length > 0) {
			handleGetHolidays(yearsToLoad);
		}
	}, [yearsToLoad]);

	return (
		<>
			{isLoading && <Loader />}
			<Header />
			<Calendar days={daysWithData} />
		</>
	);
};

export default App;
