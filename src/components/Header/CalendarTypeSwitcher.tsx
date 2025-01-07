import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCalendarType } from '@/store/features/calendar/calendarSelectors';
import { setCalendarType } from '@/store/features/calendar/calendarSlice';
import { CalendarViewType } from '@/types/calendar.ts';

const Container = styled.div`
	display: flex;
	gap: 8px;
`;

const ViewButton = styled.button<{ isActive: boolean }>`
	border-radius: 5px;
	border: none;
	background: ${props => (props.isActive ? '#ced1d5' : 'white')};
	color: #212121;
	font-weight: 500;
	cursor: ${props => (props.isActive ? 'default' : 'pointer')};
	width: 100px;
	height: 40px;
	box-shadow: ${props =>
		props.isActive ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.1)'};
	&:hover:not(:disabled) {
		background: ${props => (props.isActive ? '#ced1d5' : '#edf2f7')};
	}
	transition: background-color 0.3s ease;
`;

const CalendarTypeSwitcher: React.FC = () => {
	const dispatch = useAppDispatch();
	const currentCalendarType = useAppSelector(getCalendarType);

	const handleChangeType = (newType: CalendarViewType) => {
		dispatch(setCalendarType(newType));
	};

	return (
		<Container>
			{Object.values(CalendarViewType).map(viewType => {
				const isActive = viewType === currentCalendarType;
				return (
					<ViewButton
						key={viewType}
						type='button'
						onClick={() => handleChangeType(viewType)}
						isActive={isActive}
						disabled={isActive}
					>
						{viewType}
					</ViewButton>
				);
			})}
		</Container>
	);
};

export default CalendarTypeSwitcher;
