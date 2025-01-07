import styled from '@emotion/styled';
import { memo } from 'react';

const Container = styled.div`
	position: sticky;
	top: 61px;
	z-index: 1;
	background: #f7f7f7;
	border-bottom: 1px solid #e2e8f0;
	min-width: fit-content;
`;

const Grid = styled.div`
	position: sticky;
	top:
	z-index: 1;
	display: grid;
	align-items: center;
	grid-template-columns: repeat(7, 1fr);
	gap: 6px;
	height: 40px;
	padding: 0 24px;
	max-width: 1920px;
	margin: 0 auto;
	min-width: fit-content;
`;

const Day = styled.p`
	text-align: center;
	font-weight: 500;
	color: #4a5568;
	min-width: 180px;
`;

const CalendarHeader = () => {
	const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	return (
		<Container>
			<Grid>
				{DAYS.map(day => (
					<Day key={day}>{day}</Day>
				))}
			</Grid>
		</Container>
	);
};

export default memo(CalendarHeader);
