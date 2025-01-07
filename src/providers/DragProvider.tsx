import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateDayTasks } from '@/store/features/tasks/tasksSlice';
import { getTasks } from '@/store/features/tasks/tasksSelectors';
import { reorderTasksList } from '@/utils/tasks';
import { isISODateString } from '@/utils/calendar';
import type { ISODateString } from '@/types/calendar';

interface IProps {
	children: React.ReactNode;
	setIsDragging: (isDragging: boolean) => void;
}

const DragProvider: React.FC<IProps> = ({ children, setIsDragging }) => {
	const dispatch = useAppDispatch();
	const tasksByDate = useAppSelector(getTasks);

	const onDragStart = () => {
		setIsDragging(true);
	};

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;
		if (
			!destination ||
			(source.droppableId === destination.droppableId && source.index === destination.index)
		) {
			setIsDragging(false);
			return;
		}

		const isValidSource = isISODateString(source.droppableId);
		const isValidDestination = isISODateString(destination.droppableId);
		if (!isValidSource || !isValidDestination) return;

		const updatedTasks = reorderTasksList(
			tasksByDate,
			source.droppableId as ISODateString,
			destination.droppableId as ISODateString,
			source.index,
			destination.index
		);
		dispatch(updateDayTasks(updatedTasks));
		setIsDragging(false);
	};

	return (
		<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
			{children}
		</DragDropContext>
	);
};

export default DragProvider;
