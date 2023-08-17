import { createContext, useContext, useState } from 'react'
import { supabase } from '../supabase/client'

// pasos para crear un contexto
// 1- crearlo
// 2- proveerlo
// 2- consumirlo

export const TaskContext = createContext() // 1- creacion del contexto

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  // custom hook para usar el contenido del contexto creado
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskContextProvider')
  }
  return context
}

// eslint-disable-next-line react/prop-types
export const TaskContextProvider = ({ children }) => {
  // 2- crear el proveedor del contenido del contexto  que sera  3- comsumido en el app.jsx
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [adding, setAdding] = useState(false)

  const loginWithMagicLink = async (email) => {
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) {
        throw error
      }
      alert('check your email for the magic link')
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (taskName) => {
    setAdding(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      // const { error } = await supabase
      const { error, data } = await supabase
        .from('tasks')
        .insert({
          name: taskName,
          userId: user.id,
        })
        .select()

      setTasks([...data, ...tasks])

      if (error) throw error
    } catch (error) {
      console.log(error.message)
    } finally {
      setAdding(false)
    }
  }

  const getTasks = async (done = false) => {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()
    // console.log(user)

    try {
      const { error, data } = await supabase
        .from('tasks')
        .select('id, name, done')
        .eq('userId', user.id)
        .eq('done', done)
        .order('id', { ascending: false })

      if (error) throw error

      setTasks(data)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateTask = async (id, updatedFields) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { error } = await supabase // revisar
        .from('tasks')
        .update(updatedFields)
        .eq('userId', user.id)
        .eq('id', id)

      if (error) {
        throw error
      }

      setTasks(tasks.filter((task) => task.id !== id))
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteTask = async (id) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('userId', user.id)
        .eq('id', id)

      if (error) {
        throw error
      }
      setTasks(tasks.filter((tasks) => tasks.id !== id))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        loading,
        adding,
        updateTask,
        deleteTask,
        loginWithMagicLink,
        logout,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
