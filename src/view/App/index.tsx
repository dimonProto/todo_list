import React from 'react';
import '../styles/reset.scss';
import '../styles/common.scss';
import styles from './index.module.scss';
import { useTodoStore } from '../../data/stores/useTodoStores';
import InputPlus from '../components/InputPlus';
import InputTask from '../components/InputTask';

export const App: React.FC = () => {
	const [tasks, createTask, removeTask, updateTask] = useTodoStore(
		(state) => [
			state.tasks,
			state.createTask,
			state.removeTask,
			state.updateTask
		]
	);
	console.log(tasks);
	return (
		<div className={styles.article}>
			<h1 className={styles.articleTitle}>To do App</h1>
			<section className={styles.articleAdd}>
				<InputPlus
					onAdd={(title: string) => title && createTask(title)}
				/>
			</section>
			<hr />
			<section className={styles.articleList}>
				{!tasks.length && <p className={styles.noTask}>No one task</p>}
				{tasks.length > 0 &&
					tasks.map((task) => (
						<InputTask
							key={task.id}
							title={task.title}
							id={task.id}
							onRemoved={removeTask}
							onEdited={updateTask}
							onDone={removeTask}
						/>
					))}
			</section>
		</div>
	);
};
