import React, { useCallback, useState } from 'react';
import styles from './index.module.scss';

interface InputPlusProps {
	onAdd: (text: string) => void;
}

const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
	const [inputValue, setInputValue] = useState('');
	const addTask = useCallback(() => {
		onAdd(inputValue);
		setInputValue('');
	}, [inputValue]);
	return (
		<div className={styles.wrapper}>
			<input
				type="text"
				value={inputValue}
				placeholder="Type Here"
				className={styles.input}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(event) => event.key === 'Enter' && addTask()}
			/>
			<button
				className={styles.button}
				onClick={addTask}
				aria-label="Add"
			/>
		</div>
	);
};

export default InputPlus;
