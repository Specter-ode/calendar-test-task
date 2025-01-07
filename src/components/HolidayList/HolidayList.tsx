import styled from '@emotion/styled';
import type { IHoliday } from '@/types/calendar';
import { memo } from 'react';

const Container = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const Holiday = styled.p<{ isGlobalHoliday: boolean }>`
	font-size: 12px;
	color: ${({ isGlobalHoliday }) => (isGlobalHoliday ? '#805ad5' : '#e73847')};
`;

interface IProps {
	holidays: IHoliday[];
}

export const HolidayList: React.FC<IProps> = ({ holidays }) => {
	return (
		<Container>
			{holidays.map(holiday => (
				<li key={holiday.id}>
					<Holiday isGlobalHoliday={holiday.global}>{holiday.name}</Holiday>
				</li>
			))}
		</Container>
	);
};

export default memo(HolidayList);
