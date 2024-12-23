import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import { toast } from 'react-hot-toast'

export function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')

        if (!accessToken) {
          // Silently redirect without showing error - the error will be shown by the login page
          navigate('/login')
          return
        }

        const { data: { session }, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        })

        if (error) {
          throw error
        }

        if (!session) {
          throw new Error('No session established')
        }

        toast.success('Successfully signed in!')
        navigate('/dashboard')
      } catch (error) {
        console.error('Error in auth callback:', error)
        // Clear any existing session
        await supabase.auth.signOut()
        // Only show error toast if we had an access token but failed to establish session
        if (new URLSearchParams(window.location.hash.substring(1)).get('access_token')) {
          toast.error('Failed to complete authentication')
        }
        navigate('/login')
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Completing sign in...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  )
}
