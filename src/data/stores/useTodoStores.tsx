import create, { State, StateCreator } from 'zustand';
import { generateId } from '../helpers';

interface Task {
	id: string;
	title: string;
	createAt: number;
}

interface TodoStore {
	tasks: Task[];
	createTask: (title: string) => void;
	updateTask: (id: string, title: string) => void;
	removeTask: (id: string) => void;
}

function isTodoStore(object: any): object is TodoStore {
	return 'tasks' in object;
}

const localStorageUpdate =
	<T extends State>(config: StateCreator<T>): StateCreator<T> =>
	(set, get, api) =>
		config(
			(nextState, ...arg) => {
				if (isTodoStore(nextState)) {
					window.localStorage.setItem(
						'tasks',
						JSON.stringify(nextState.tasks)
					);
				}
				set(nextState, ...arg);
			},
			get,
			api
		);

const getCurrentState = () => {
	try {
		return JSON.parse(
			window.localStorage.getItem('tasks') || '[]'
		) as Task[];
	} catch (e) {
		console.log(e);
	}
	return [];
};

export const useTodoStore = create<TodoStore>(
	localStorageUpdate((set, get) => ({
		tasks: getCurrentState(),
		createTask: (title) => {
			const { tasks } = get();
			const newTask = {
				id: generateId(),
				title,
				createAt: Date.now()
			};
			set({ tasks: [newTask, ...tasks] });
		},
		updateTask: (id: string, title: string) => {
			const { tasks } = get();
			set({
				tasks: tasks.map((task) => ({
					...task,
					title: task.id === id ? title : task.title
				}))
			});
		},
		removeTask: (id: string) => {
			const { tasks } = get();
			set({
				tasks: tasks.filter((task) => task.id !== id)
			});
		}
	}))
);
