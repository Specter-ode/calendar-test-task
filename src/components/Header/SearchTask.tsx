import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSearchQuery } from '@/store/features/tasks/tasksSlice';
import { ReactComponent as CancelIcon } from '@/icons/cancel.svg';
import { ReactComponent as SearchIcon } from '@/icons/search.svg';

const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 50%;
	left: 12px;
	transform: translateY(-50%);
	color: #a0aec0;
	transition: color 0.3s ease;
`;

const SearchContainer = styled.label`
	position: relative;
	min-width: 200px;
	height: 300px;
	display: flex;
	align-items: center;
	height: 40px;
	&:focus-within ${IconWrapper} {
		color: rgb(94, 97, 100);
	}
`;

const Input = styled.input`
	width: 100%;
	height: 100%;
	padding: 8px 12px 8px 36px;
	border: 1px solid #e2e8f0;
	border-radius: 6px;
	font-size: 14px;

	&:focus {
		outline: none;
		border-color: rgb(164, 168, 173);
	}
	transition: border-color 0.3s ease;
`;

const ClearButton = styled.button`
	position: absolute;
	top: 50%;
	right: 12px;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
	border: none;
	background-color: white;
	border-radius: 4px;
	color: #4a5568;
	&:hover {
		background-color: #f7f7f7;
	}
	transition: background-color 0.3s ease;
`;

const SearchTask = () => {
	const dispatch = useAppDispatch();
	const [value, setValue] = useState('');

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(setSearchQuery(value));
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [dispatch, value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleClearValue = () => {
		setValue('');
	};

	return (
		<SearchContainer htmlFor='search'>
			<IconWrapper>
				<SearchIcon width='20' height='20' />
			</IconWrapper>
			<Input
				id='search'
				type='text'
				value={value}
				onChange={handleChange}
				placeholder='Search tasks...'
				maxLength={100}
			/>
			{value.trim() && (
				<ClearButton onClick={handleClearValue} type='button'>
					<CancelIcon width='16' height='16' />
				</ClearButton>
			)}
		</SearchContainer>
	);
};

export default SearchTask;
