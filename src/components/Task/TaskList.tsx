import styled from '@emotion/styled';
import type { ITask } from '@/types/calendar';
import { memo } from 'react';
import TaskItem from './TaskItem';
import { useSelector } from 'react-redux';
import { getSearchQuery } from '@/store/features/tasks/tasksSelectors';

const List = styled.ul`
	display: flex;
	flex-direction: column;
	flex: 1;
	gap: 4px;
	min-height: fit-content;
`;

interface Props {
	tasks: ITask[];
	taskInFormAction: ITask | null;
	handleOpenEditTaskForm: (value: ITask) => void;
}

const TaskList: React.FC<Props> = ({ tasks, taskInFormAction, handleOpenEditTaskForm }) => {
	const searchQuery = useSelector(getSearchQuery);

	const shouldHideTask = (taskName: string): boolean => {
		const normalizedValue = searchQuery?.trim().toLowerCase();
		return normalizedValue ? !taskName.toLowerCase().includes(normalizedValue) : false;
	};
	return (
		<List>
			{tasks?.map((task, index) => {
				const isInEdit = taskInFormAction?.id === task.id;
				const isHide = shouldHideTask(task.name);
				return (
					<TaskItem
						key={task.id}
						task={task}
						index={index}
						isInEdit={isInEdit}
						handleOpenEditTaskForm={handleOpenEditTaskForm}
						isHide={isHide}
					/>
				);
			})}
		</List>
	);
};

export default memo(TaskList);
