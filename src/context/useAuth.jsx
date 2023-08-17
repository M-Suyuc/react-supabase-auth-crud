import { createContext, useContext } from 'react'

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

const h = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log(user)
}

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider
      value={{
        user: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
