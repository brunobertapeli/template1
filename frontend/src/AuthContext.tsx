import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react'
import { supabase } from './supabase'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  authModalOpen: boolean
  openAuthModal: () => void
  closeAuthModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("Auth state change detected:", { event: _event, hasSession: !!session })
        setUser(session?.user || null)
        setLoading(false)

        // If user logs in, call backend to sync/validate
        if (_event === 'SIGNED_IN' && session?.access_token) {
          console.log("User signed in. Calling backend /.netlify/functions/auth...")
          const token = session.access_token
          try {
            const response = await fetch('/.netlify/functions/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token }),
            })
            console.log("Backend /.netlify/functions/auth response status:", response.status)
            const responseBody = await response.json()
            console.log("Backend /.netlify/functions/auth response body:", responseBody)

            if (!response.ok) {
              console.error("Backend /.netlify/functions/auth call failed:", responseBody)
            }
          } catch (error) {
            console.error("Error calling backend /.netlify/functions/auth:", error)
          }
        }
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  // Expose the auth modal state
  const openAuthModal = () => setAuthModalOpen(true)
  const closeAuthModal = () => setAuthModalOpen(false)

  // Sign out function
  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error: any) {
      console.error('Error signing out:', error.message)
    }
  }

  // Return the auth context value
  const value: AuthContextType = {
    user,
    loading,
    signOut,
    authModalOpen,
    openAuthModal,
    closeAuthModal,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
