import styled from '@emotion/styled';
import CalendarTypeSwitcher from './CalendarTypeSwitcher';
import DateSwitcher from './DateSwitcher';
import SearchTask from './SearchTask';

const HeaderContainer = styled.header`
	position: fixed;
	right: 0;
	top: 0;
	z-index: 1;
	border-bottom: 1px solid #e2e8f0;
	background: #f7f7f7;
	width: 100%;
	min-width: max-content;
`;

const FlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 16px;
	align-items: center;
	padding: 10px 24px;
	max-width: 1920px;
	margin: 0 auto;
	@media (max-width: 828px) {
		justify-content: center;
		flex-direction: column-reverse;
	}
`;

const Header: React.FC = () => {
	return (
		<HeaderContainer>
			<FlexContainer>
				<SearchTask />
				<DateSwitcher />
				<CalendarTypeSwitcher />
			</FlexContainer>
		</HeaderContainer>
	);
};

export default Header;
