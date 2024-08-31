import styles from './TasksList.module.css'
import clipboard from '../assets/Clipboard.png'
import { Check, Trash } from 'phosphor-react';

export interface TasksListType {
    id: string;
    isChecked: boolean;
    text: string;

}

interface PostProps {
    props: TasksListType;
    removeTask: (id: string) => void
    toggleTaskStatus: ({ id, value }: { id: string; value: boolean }) => void
}

export function TasksList({ props, removeTask, toggleTaskStatus }: PostProps) {

    function handleTaskToggle() {
        toggleTaskStatus({ id: props.id, value: !props.isChecked })
    }

    function handleRemove() {
        removeTask(props.id)
    }

    const checkboxCheckedClassname = props.isChecked
        ? styles['checkbox-checked']
        : styles['checkbox-unchecked']
    const paragraphCheckedClassname = props.isChecked
        ? styles['paragraph-checked']
        : styles['']

    return (
        <div className={styles.tasksList}>
            <div>
                <label htmlFor="checkbox" onClick={handleTaskToggle}>
                    <input readOnly type="checkbox" checked={props.isChecked} />
                    <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
                        {props.isChecked && <Check size={12} />}
                    </span>

                    <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>
                        {props.text}
                    </p>
                </label>
            </div>

            <button onClick={handleRemove}>
                <Trash size={16} color="#808080" />
            </button>
        </div>
    )
}