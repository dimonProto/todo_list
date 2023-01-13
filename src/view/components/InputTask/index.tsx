import React, { useEffect, useRef, useState } from 'react';
import style from './index.module.scss';

interface InputTaskProps {
	id: string;
	title: string;
	onDone: (id: string) => void;
	onRemoved: (id: string) => void;
	onEdited: (id: string, title: string) => void;
}
const InputTask: React.FC<InputTaskProps> = ({
	onDone,
	onEdited,
	onRemoved,
	id,
	title
}) => {
	const [check, setCheck] = useState<string>('');
	const [value, setValue] = useState<string>(title);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditMode) {
			inputRef?.current?.focus();
		}
	}, [isEditMode]);

	const handleCheck = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: string
	) => {
		setCheck(e.target.value);
		setTimeout(() => {
			onDone(id);
		}, 200);
	};

	return (
		<div className={style.InputTask}>
			<label className={style.InputLabel}>
				<input
					type="checkbox"
					disabled={isEditMode}
					value={check}
					className={style.InputTaskCheckbox}
					onChange={(e) => handleCheck(e, id)}
				/>

				{isEditMode ? (
					<input
						type="text"
						value={value}
						ref={inputRef}
						className={style.InputTaskTitleEdit}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								setIsEditMode(false);
								onEdited(id, value);
							}
						}}
					/>
				) : (
					<h3 className={style.InputTaskTitle}>{title}</h3>
				)}
			</label>
			{isEditMode ? (
				<button
					className={style.InputTaskSave}
					aria-label={'Ok'}
					onClick={() => {
						setIsEditMode(false);
						onEdited(id, value);
					}}
				/>
			) : (
				<button
					className={style.InputTaskEdit}
					aria-label={'Edit'}
					onClick={() => setIsEditMode(true)}
				/>
			)}

			<button
				className={style.InputTaskDelete}
				aria-label={'Delete'}
				onClick={() => confirm('delete this task') && onRemoved(id)}
			/>
		</div>
	);
};

export default InputTask;
