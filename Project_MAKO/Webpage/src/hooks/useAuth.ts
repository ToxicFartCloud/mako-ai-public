mport { useState, useEffect } from 'react'
import { lumi } from '../lib/lumi'

interface User {
  projectId: string
  userId: string
  email: string
  userName: string
  userRole: 'ADMIN' | 'USER'
  createdTime: string
  accessToken: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(lumi.auth.user)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check existing session on mount
    const existingUser = lumi.auth.user
    if (existingUser) {
      setUser(existingUser)
    }

    // Listen to authentication state changes
    const unsubscribe = lumi.auth.onAuthChange((newUser: User | null) => {
      setUser(newUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async () => {
    try {
      setLoading(true)
      await lumi.auth.signIn()
    } catch (error) {
      console.error('Login failed:', error)
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      await lumi.auth.signOut()
    } catch (error) {
      console.error('Logout failed:', error)
      setLoading(false)
    }
  }

  return {
    user,
    isAuthenticated: !!user,
    userRole: user?.userRole,
    loading,
    signIn,
    signOut
  }
}
