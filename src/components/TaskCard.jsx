/* eslint-disable react/prop-types */
import React from 'react'
import { useTasks } from '../context/TaskContext'

function TaskCard({ task }) {
  const { deleteTask, updateTask } = useTasks()

  const handleDelete = async (id) => {
    await deleteTask(id)
  }
  const handleToggleDone = async (id, doneState) => {
    await updateTask(id, { done: !doneState })
  }

  return (
    <div className='card card-body'>
      <h1 className='h5'>{task.name}</h1>
      <span>{task.done ? 'Done ✅' : 'Not done ❌ '}</span>
      <div className='ms-auto'>
        <button
          className='btn btn-danger btn-sm me-1'
          onClick={() => handleDelete(task.id)}
        >
          Delete
        </button>
        <button
          className='btn btn-secondary btn-sm '
          onClick={() => handleToggleDone(task.id, task.done)}
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default TaskCard
