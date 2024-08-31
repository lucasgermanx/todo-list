import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { Empty } from './components/Empty'
import { Header } from './components/Header'
import { Tasks } from './components/Tasks'
import db from '../database/database'
import { TasksList, TasksListType } from './components/TasksList'
import "./global.css"
import { v4 as uuidv4 } from "uuid";

export function App() {

  const [tasks, setTasks] = useState<TasksListType[]>([])

  useEffect(() => {
    db.tasks.toArray().then((storedTasks) => {
      setTasks(storedTasks);
    });
  }, []);

  const createdTasks = tasks.length
  const completedTasks = tasks.filter(task => task.isChecked)

  function handleAddTask(text: string) {
    if (!text) {
      return
    }

    const newTask: TasksListType = {
      id: uuidv4(),
      text: text,
      isChecked: false,
    }
    db.tasks.add(newTask);

    setTasks((state) => [...state, newTask])
  }

  function handleRemoveTask(id: string) {
    const filteredTasks = tasks.filter((task) => task.id !== id)
    console.log(filteredTasks)
    if (!confirm('Deseja mesmo apagar essa tarefa?')) {
      return
    }
    db.tasks.delete(id);
    setTasks(filteredTasks)
  }

  function handleToggleTask({ id, value }: { id: string; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value }
      }
      return { ...task }
    })

    db.tasks.update(id, { isChecked: value });
    setTasks(updatedTasks)
  }

  return (
    <div>
      <Header />
      <Tasks createdTasks={createdTasks} completedTasks={completedTasks.length} createTask={handleAddTask} />
      {tasks.length > 0 ? (
        <div>
          {tasks.map((task) => (
            <TasksList
              key={task.id}
              props={task}
              removeTask={handleRemoveTask}
              toggleTaskStatus={handleToggleTask}
            />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  )
}