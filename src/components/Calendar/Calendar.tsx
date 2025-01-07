import styled from '@emotion/styled';

import { CalendarDay } from './CalendarDay';
import { useAppSelector } from '@/store/hooks';
import { getCalendarType } from '@/store/features/calendar/calendarSelectors';
import type { IDay } from '@/types/calendar';
import { useMemo, useState } from 'react';
import DragProvider from '../../providers/DragProvider';
import CalendarHeader from './CalendarHeader';

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	padding-top: 60px;
`;

const WeekContainer = styled.div<{ isOneWeek: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 6px;
	flex: 1;
	min-height: fit-content;
	padding: 8px 16px 8px 24px;
	width: 100%;
	max-width: 1920px;
	margin: 0 auto;
`;

const WeekRow = styled.div<{ isOneWeek: boolean }>`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 6px;
	flex: ${({ isOneWeek }) => (isOneWeek ? 1 : 'none')};
	min-height: 180px;
`;

interface IProps {
	days: IDay[];
}
const Calendar: React.FC<IProps> = ({ days }) => {
	const currentCalendarType = useAppSelector(getCalendarType);
	const isOneWeek = currentCalendarType === 'Week';
	const [isDragging, setIsDragging] = useState<boolean>(false);

	const weeks = useMemo(() => {
		const result = [];
		for (let i = 0; i < days.length; i += 7) {
			result.push(days.slice(i, i + 7));
		}
		return result;
	}, [days]);

	return (
		<>
			<CalendarHeader />
			<Container>
				<DragProvider setIsDragging={setIsDragging}>
					<WeekContainer isOneWeek={isOneWeek}>
						{weeks.map((week, weekIndex) => (
							<WeekRow key={weekIndex} isOneWeek={isOneWeek}>
								{week.map(day => (
									<CalendarDay key={day.date} day={day} isDragging={isDragging} />
								))}
							</WeekRow>
						))}
					</WeekContainer>
				</DragProvider>
			</Container>
		</>
	);
};

export default Calendar;
