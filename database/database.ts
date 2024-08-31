import Dexie from 'dexie';

// Defina o tipo de dados que a tabela tasks vai armazenar
export interface Task {
    id: string;
    text: string;
    isChecked: boolean;
}

// Crie a instância do banco de dados
class TasksDatabase extends Dexie {
    // Defina a tabela 'tasks' com o tipo Task
    tasks!: Dexie.Table<Task, string>;

    constructor() {
        super('TasksDatabase');
        this.version(1).stores({
            tasks: 'id, text, isChecked' // Define os campos da tabela
        });
    }
}

// Exporte uma instância do banco de dados
const db = new TasksDatabase();
export default db;
