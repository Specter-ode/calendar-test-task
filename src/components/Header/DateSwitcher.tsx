import styled from '@emotion/styled';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCalendarState } from '@/store/features/calendar/calendarSelectors';
import { setSelectedDate } from '@/store/features/calendar/calendarSlice';
import { moveToNextMonth, moveToNextWeek, moveToPrevMonth, moveToPrevWeek } from '@/utils/date';
import { CalendarViewType } from '@/types/calendar';
import { ReactComponent as ArrowIcon } from '@/icons/arrow-left.svg';

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

const NavigationButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px;
	border-radius: 6px;
	border: 1px solid #e2e8f0;
	background: white;
	color: #4a5568;
	transition: all 0.2s ease;
	&:hover {
		background: #edf2f7;
	}
`;

const MonthDateDisplay = styled.p`
	font-size: 18px;
	font-weight: 700;
	min-width: 200px;
	text-align: center;
`;

const WeekDateDisplay = styled.p`
	font-size: 14px;
	font-weight: 500;
	min-width: 200px;
	text-align: center;
`;

const DateSwitcher: React.FC = () => {
	const dispatch = useAppDispatch();
	const { calendarType, selectedDate } = useAppSelector(getCalendarState);

	const handleNext = () => {
		const newDate =
			calendarType === CalendarViewType.Month
				? moveToNextMonth(selectedDate)
				: moveToNextWeek(selectedDate);
		dispatch(setSelectedDate(newDate));
	};

	const handlePrev = () => {
		const newDate =
			calendarType === CalendarViewType.Month
				? moveToPrevMonth(selectedDate)
				: moveToPrevWeek(selectedDate);
		dispatch(setSelectedDate(newDate));
	};

	const formatMonth = (date: Date) => {
		return format(date, 'LLLL yyyy');
	};

	const formatWeekRange = (start: Date, end: Date) => {
		const sameMonth = start.getMonth() === end.getMonth();
		const sameYear = start.getFullYear() === end.getFullYear();

		if (sameMonth && sameYear) {
			return `${format(start, 'd')} - ${format(end, 'd LLLL yyyy')}`;
		} else if (sameYear) {
			return `${format(start, 'd LLLL')} - ${format(end, 'd LLLL yyyy')}`;
		}
		return `${format(start, 'd LLLL yyyy')} - ${format(end, 'd LLLL yyyy')}`;
	};

	return (
		<Container>
			<NavigationButton onClick={handlePrev}>
				<ArrowIcon width='16' height='16' />
			</NavigationButton>

			{calendarType === CalendarViewType.Month ? (
				<MonthDateDisplay>
					{formatMonth(new Date(selectedDate.year, selectedDate.month))}
				</MonthDateDisplay>
			) : (
				<WeekDateDisplay>
					{formatWeekRange(new Date(selectedDate.weekStart), new Date(selectedDate.weekEnd))}
				</WeekDateDisplay>
			)}

			<NavigationButton onClick={handleNext}>
				<ArrowIcon width='16' height='16' style={{ transform: 'rotate(180deg)' }} />
			</NavigationButton>
		</Container>
	);
};

export default DateSwitcher;
