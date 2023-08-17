import { useState } from 'react'
import { useTasks } from '../context/TaskContext'

function Login () {
  const [email, setEmail] = useState('')
  const { loading, loginWithMagicLink } = useTasks()

  const handleSubmit = async (e) => {
    e.preventDefault()
    loginWithMagicLink(email)
    setEmail('')
  }

  return (
    <div className='row pt-4'>
      <h1 className='text-center'>Sing in</h1>
      <div className='col-md-4 offset-md-4'>
        <form onSubmit={handleSubmit} className='card card-body'>
          <input
            type='email'
            value={email}
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='youremail@site.com'
            className='form-control mb-2'
            required
          />
          <div className='ms-auto'>
            <button disabled={loading} className='btn btn-primary '>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
