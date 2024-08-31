import { ChangeEvent, FormEvent, useState } from 'react'
import { PlusCircle } from "phosphor-react";

import styles from './Tasks.module.css'

interface TasksProps {
    createdTasks: number;
    completedTasks: number;
    createTask: any
}


export function Tasks({ createdTasks, completedTasks, createTask }: TasksProps) {
    const [newCommentText, setNewCommentText] = useState('')

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("")

        setNewCommentText(event.target.value);
    }
    function handleCrateNewTask(event: FormEvent) {
        event.preventDefault()

        createTask(newCommentText)
        setNewCommentText('');
    }

    return (
        <div>
            <header>
                <form onSubmit={handleCrateNewTask} className={styles.tasksForm}>
                    <textarea
                        name="comment"
                        placeholder="Adicione uma nova tarefa"
                        value={newCommentText}
                        onChange={handleNewCommentChange}
                        // onInvalid={handleNewCommentInvalid}
                        required={true}
                    />
                    <footer>
                        <button type="submit">Criar <PlusCircle size={16} /></button>
                    </footer>

                </form>
            </header>
            <div className={styles.tasks}>
                <header>
                    <div className={styles.tasksCreated}>Tarefas criadas <span>{createdTasks}</span></div>
                    <div className={styles.tasksCompleted}>Concluídas <span>{completedTasks}</span></div>
                </header>
            </div>
        </div>
    )
}