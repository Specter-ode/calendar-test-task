import styled from '@emotion/styled';
import { ReactComponent as AcceptIcon } from '@/icons/accept.svg';
import { ReactComponent as EditIcon } from '@/icons/edit.svg';
import { ReactComponent as TrashIcon } from '@/icons/trash.svg';
import { ReactComponent as CancelIcon } from '@/icons/cancel.svg';
import type { ITask } from '@/types/calendar';
import { TaskFormModeType } from '@/types/calendar';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addTask, deleteTask, editTask } from '@/store/features/tasks/tasksSlice';

interface IProps {
	data: ITask;
	mode: TaskFormModeType;
	onClose: () => void;
}

const TaskInputContainer = styled.form`
	display: flex;
	gap: 4px;
	width: 100%;
	padding: 0 10px;
`;

const TaskInput = styled.input`
	width: 100%;
	height: 24px;
	padding: 0 6px;
	border: 1px solid transparent;
	border-radius: 4px;
	font-size: 12px;
	border-color: rgb(73, 131, 202);
	&:focus {
		outline: none;
		border-color: rgb(73, 131, 202);
	}
`;

const TaskActions = styled.div`
	display: flex;
	position: absolute;
	top: 10px;
	right: 10px;
	gap: 4px;
`;

const ActionButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
	border: none;
	background-color: #f7f7f7;
	border-radius: 4px;
	color: #4a5568;
	cursor: pointer;
	&:hover {
		background-color: white;
	}
	transition: all 0.3s ease;
`;

const CalendarTaskForm: React.FC<IProps> = ({ data, mode, onClose }) => {
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState<string>('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (title.trim()) {
			const newData = { ...data, name: title.trim() };
			if (mode === TaskFormModeType.Edit) {
				dispatch(editTask(newData));
			} else if (mode === TaskFormModeType.Add) {
				dispatch(addTask(newData));
			}
			onClose();
		}
	};

	const handleDeleteTask = () => {
		dispatch(deleteTask(data));
		onClose();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	useEffect(() => {
		setTitle(data.name);
	}, [data.name]);

	return (
		<TaskInputContainer onSubmit={handleSubmit}>
			<TaskInput
				id='title'
				type='text'
				autoFocus
				required
				placeholder={mode === TaskFormModeType.Add ? 'New task...' : 'Edit task...'}
				value={title}
				onChange={handleChange}
				maxLength={100}
			/>
			<TaskActions>
				<ActionButton type='submit'>
					{mode === TaskFormModeType.Edit ? (
						<EditIcon width='16' height='16' />
					) : (
						<AcceptIcon width='16' height='16' />
					)}
				</ActionButton>
				{mode === TaskFormModeType.Edit && (
					<ActionButton onClick={handleDeleteTask} type='button'>
						<TrashIcon width='16' height='16' />
					</ActionButton>
				)}
				<ActionButton onClick={onClose} type='button'>
					<CancelIcon width='16' height='16' />
				</ActionButton>
			</TaskActions>
		</TaskInputContainer>
	);
};

export default CalendarTaskForm;
