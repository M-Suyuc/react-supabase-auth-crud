import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useNavigate } from 'react-router-dom'

function Home () {
  const navigate = useNavigate()
  const [showTaskDone, setShowTaskDone] = useState(false)

  useEffect(() => {
    if (!supabase.auth.getUser()) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className='row pt-4'>
      <div className='col-md-4 offset-md-4'>
        <TaskForm />
        <header className='d-flex justify-content-between my-3'>
          <span className='h5'>{showTaskDone ? 'Done Tasks' : 'Tasks'}</span>
          <button className='btn btn-dark btn-sm' onClick={() => setShowTaskDone(!showTaskDone)}> {showTaskDone ? 'Show tasks to do' : 'Show tasks done'}</button>
        </header>

        <TaskList done={showTaskDone} />
      </div>
    </div>
  )
}

export default Home
