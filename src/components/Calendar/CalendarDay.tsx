import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { format, isFirstDayOfMonth, isLastDayOfMonth } from 'date-fns';
import { useAppSelector } from '@/store/hooks';
import { getCalendarType } from '@/store/features/calendar/calendarSelectors';
import type { ITask, IDay } from '@/types/calendar';
import { TaskFormModeType } from '@/types/calendar';
import HolidayList from '@/components/HolidayList/HolidayList';
import { ReactComponent as PlusIcon } from '@/icons/plus.svg';

import { Droppable } from '@hello-pangea/dnd';
import TaskList from '@/components/Task/TaskList';
import { nanoid } from '@reduxjs/toolkit';
import CalendarTaskForm from './CalendarTaskForm';

interface IProps {
	day: IDay;
	isDragging: boolean;
}

const AddButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	padding: 4px;
	border: none;
	background-color: #f7f7f7;
	border-radius: 4px;
	color: #4a5568;
	cursor: pointer;
	&:hover {
		background: white;
	}
	transition: all 0.3s ease;
`;

const Cell = styled.div<{ isWeekView: boolean; isCurrentPeriod: boolean; isDraggingOver: boolean }>`
	position: relative;
	background-color: ${({ isDraggingOver, isCurrentPeriod }) =>
		isDraggingOver
			? `rgba(221, 222, 231, ${!isCurrentPeriod ? 0.5 : 1})`
			: `rgba(233, 235, 239, ${!isCurrentPeriod ? 0.5 : 1})`};
	height: ${({ isWeekView }) => (isWeekView ? '100%' : '180px')};
	min-width: 180px;
	padding: 10px 0;
	display: flex;
	flex-direction: column;
	gap: 4px;
	border-radius: 5px;
	&:hover ${AddButton} {
		opacity: 1;
	}
	transition: all 0.3s ease;
`;

const DayHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-height: 24px;
	padding: 0 10px;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding-left: 10px;
	padding-right: 5px;
	overflow-y: overlay;
	scrollbar-gutter: stable;
	flex-grow: 1;
	min-height: 0;

	&::-webkit-scrollbar {
		width: 5px;
	}
`;
const DayDate = styled.span<{
	isCurrentPeriod: boolean;
}>`
	font-size: 14px;
	font-weight: 700;
	color: #2d3748;
	opacity: ${({ isCurrentPeriod }) => (isCurrentPeriod ? 1 : 0.5)};
`;

export const CalendarDay: React.FC<IProps> = ({ day, isDragging }) => {
	const { date, tasks, holidays, isCurrentPeriod } = day;
	const calendarType = useAppSelector(getCalendarType);
	const isWeekView = calendarType === 'Week';
	const [taskInFormAction, setTaskInFormAction] = useState<ITask | null>(null);
	const [taskFormMode, setTaskFormMode] = useState<TaskFormModeType>(TaskFormModeType.Closed);
	const displayDate = useMemo((): string => {
		const dateObj = new Date(date);
		if (isFirstDayOfMonth(dateObj) || isLastDayOfMonth(dateObj)) {
			return format(dateObj, 'MMM d');
		}
		return format(dateObj, 'd');
	}, [date]);

	const handleCloseTaskForm = () => {
		setTaskFormMode(TaskFormModeType.Closed);
		if (taskInFormAction !== null) {
			setTaskInFormAction(null);
		}
	};

	useEffect(() => {
		if (isDragging && taskFormMode !== TaskFormModeType.Closed) {
			handleCloseTaskForm();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDragging, taskFormMode]);

	const handleOpenAddTaskForm = () => {
		setTaskFormMode(TaskFormModeType.Add);
		const initialData = { id: nanoid(), position: tasks.length + 1, name: '', date };
		setTaskInFormAction(initialData);
	};
	const handleOpenEditTaskForm = useCallback((task: ITask) => {
		setTaskFormMode(TaskFormModeType.Edit);
		setTaskInFormAction(task);
	}, []);
	return (
		<Droppable droppableId={date} direction='vertical'>
			{(provided, snapshot) => (
				<Cell
					isWeekView={isWeekView}
					isCurrentPeriod={isCurrentPeriod}
					isDraggingOver={snapshot.isDraggingOver}
				>
					<DayHeader>
						<DayDate isCurrentPeriod={isCurrentPeriod}>{displayDate}</DayDate>
						{taskFormMode === TaskFormModeType.Closed && !isDragging && (
							<AddButton onClick={handleOpenAddTaskForm}>
								<PlusIcon width='16' height='16' />
							</AddButton>
						)}
					</DayHeader>
					{taskInFormAction && taskFormMode !== TaskFormModeType.Closed && (
						<CalendarTaskForm
							data={taskInFormAction}
							onClose={handleCloseTaskForm}
							mode={taskFormMode}
						/>
					)}
					<Content ref={provided.innerRef} {...provided.droppableProps}>
						{holidays.length > 0 && <HolidayList holidays={holidays} />}
						<TaskList
							tasks={tasks}
							taskInFormAction={taskInFormAction}
							handleOpenEditTaskForm={handleOpenEditTaskForm}
						/>

						{provided.placeholder}
					</Content>
				</Cell>
			)}
		</Droppable>
	);
};

export default CalendarDay;
