import { useTasks } from '../context/TaskContext'
import { useEffect } from 'react'
import TaskCard from './TaskCard'

// eslint-disable-next-line react/prop-types
function TaskList ({ done = false }) {
  const { tasks, getTasks, loading } = useTasks()

  useEffect(() => {
    getTasks(done)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])

  function renderTasks () {
    if (loading) {
      <p style={{ fontSize: '2rem' }}>Loading</p>
    } else if (tasks.length === 0) {
      return <p>No tasks </p>
    } else {
      return (
        <article>
          {
             tasks.map(task => (
               <TaskCard task={task} key={task.id} />
             ))
          }
        </article>
      )
    }
  }

  return (
    <div>
      {renderTasks()}
    </div>
  )
}

export default TaskList
