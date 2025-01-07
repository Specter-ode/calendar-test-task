import styled from '@emotion/styled';
import { Draggable } from '@hello-pangea/dnd';
import type { ITask } from '@/types/calendar';
import { memo } from 'react';

const Item = styled.li<{ isInAction: boolean; isHide: boolean }>`
	display: ${({ isHide }) => (isHide ? 'none' : 'block')};
	padding: 6px;
	border: 1px solid;
	border-color: ${({ isInAction }) => (isInAction ? 'rgb(164, 168, 173)' : 'transparent')};
	background: ${({ isInAction }) => (isInAction ? '#ced1d5' : 'white')};
	border-radius: 4px;
	cursor: grab;
	font-size: 12px;

	&:hover {
		background: ${({ isInAction }) => (isInAction ? '#ced1d5' : '#f7fafc')};
	}
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
const Text = styled.p`
	font-size: 12px;
	word-break: break-word;
`;
interface Props {
	task: ITask;
	index: number;
	isInEdit: boolean;
	isHide: boolean;
	handleOpenEditTaskForm: (value: ITask) => void;
}

const TaskItem: React.FC<Props> = ({ task, index, isHide, isInEdit, handleOpenEditTaskForm }) => {
	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided, snapshot) => (
				<Item
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					isInAction={snapshot.isDragging || isInEdit}
					isHide={isHide}
					onClick={e => {
						e.stopPropagation();
						handleOpenEditTaskForm(task);
					}}
				>
					<Text>{task.name}</Text>
				</Item>
			)}
		</Draggable>
	);
};

export default memo(TaskItem);
