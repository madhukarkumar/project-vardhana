import { User, Session } from '@supabase/supabase-js'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { supabase } from '../utils/supabaseClient'

export function useAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const hasShownSuccessMessage = useRef(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      setLoading(false)

      // Only show success message once on actual sign in
      if (event === 'SIGNED_IN' && currentSession && !hasShownSuccessMessage.current) {
        hasShownSuccessMessage.current = true
        toast.success('Successfully signed in!')
        navigate('/dashboard')
      } else if (event === 'SIGNED_OUT') {
        hasShownSuccessMessage.current = false
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) {
        console.error('Google sign in error:', error)
        throw error
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      toast.error('Failed to sign in with Google')
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      // Clear session first
      setSession(null)
      setUser(null)
      
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Sign out error:', error)
        toast.error('Error during sign out')
      } else {
        toast.success('Successfully signed out')
        navigate('/login')
      }
    } catch (error) {
      console.error('Unexpected error during sign out:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const isAuthenticated = !!user

  // Handle protected routes
  useEffect(() => {
    const publicRoutes = ['/', '/new-home', '/login', '/signup', '/auth/callback']
    const isPublicRoute = publicRoutes.some(route => location.pathname === route)

    if (!isAuthenticated && !loading && !isPublicRoute) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, loading, location.pathname, navigate])

  return {
    session,
    user,
    loading,
    signInWithGoogle,
    signOut,
    isAuthenticated
  }
}
