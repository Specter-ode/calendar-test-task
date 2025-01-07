import type { ISODateString, ITask } from '@/types/calendar';

export const reorderTasksList = (
	tasksByDate: Record<ISODateString, ITask[]>,
	sourceDate: ISODateString,
	destinationDate: ISODateString,
	sourceIndex: number,
	destinationIndex: number
): Record<ISODateString, ITask[]> => {
	const sourceTasks = [...(tasksByDate[sourceDate] || [])];
	const [movedTask] = sourceTasks.splice(sourceIndex, 1);

	if (sourceDate === destinationDate) {
		sourceTasks.splice(destinationIndex, 0, movedTask);
		const updatedSourceTasks = sourceTasks.map((task, index) => ({
			...task,
			position: index + 1,
		}));
		return { [sourceDate]: updatedSourceTasks };
	} else {
		const destinationTasks = [...(tasksByDate[destinationDate] || [])];
		const updatedMovedTask = {
			...movedTask,
			date: destinationDate,
		};
		destinationTasks.splice(destinationIndex, 0, updatedMovedTask);

		const updatedSourceTasks = sourceTasks.map((task, index) => ({
			...task,
			position: index + 1,
		}));
		const updatedDestinationTasks = destinationTasks.map((task, index) => ({
			...task,
			position: index + 1,
		}));
		return {
			[sourceDate]: updatedSourceTasks,
			[destinationDate]: updatedDestinationTasks,
		};
	}
};
