import styles from './Empty.module.css'
import clipboard from '../assets/Clipboard.png'

export function Empty() {
    return (
        <div className={styles.tasksEmpty}>
            <img src={clipboard} alt="Clipboard" />
            <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
            <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
    )
}