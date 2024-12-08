import { User, Session } from '@supabase/supabase-js'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { supabase } from '../utils/supabaseClient'

export function useAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        if (mounted) {
          setSession(initialSession)
          setUser(initialSession?.user ?? null)
          setLoading(false)
        }
      } catch (error) {
        toast.error('Error initializing auth')
        setLoading(false)
      }
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (mounted) {
        setSession(currentSession)
        setUser(currentSession?.user ?? null)
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          skipBrowserRedirect: false,
          flowType: 'implicit',
        },
      })
      
      if (error) throw error
      
    } catch (error) {
      toast.error('Failed to sign in with Google')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      setSession(null)
      setUser(null)
      toast.success('Successfully signed out')
      navigate('/login', { replace: true })
    } catch (error) {
      toast.error('Failed to sign out')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const isAuthenticated = !!session && !!user

  useEffect(() => {
    // List of public routes that don't require authentication
    const publicRoutes = ['/', '/new-home', '/login', '/signup', '/auth/callback']
    const isPublicRoute = publicRoutes.some(route => location.pathname === route)

    // Only redirect to login if not authenticated, not loading, not on a public route, and not already on login page
    if (!isAuthenticated && !loading && !isPublicRoute && !location.pathname.includes('/login')) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, loading, location.pathname, navigate])

  return {
    session,
    user,
    loading,
    isAuthenticated,
    signInWithGoogle,
    signOut,
  }
}
