import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'

export const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth error:', error)
          navigate('/login', { replace: true })
          return
        }

        if (data?.session) {
          console.log('Session found, redirecting to dashboard')
          navigate('/dashboard', { replace: true })
        } else {
          console.log('No session found, redirecting to login')
          navigate('/login', { replace: true })
        }
      } catch (error) {
        console.error('Callback error:', error)
        navigate('/login', { replace: true })
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}
