import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import GenerateScript from './pages/GenerateScript'
import DisplayScript from './pages/DisplayScript'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, provider } from '@/lib/firebaseConfig'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const queryClient = new QueryClient()

const allowedEmails = ['amilpa2020@gmail.com']

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    const signIn = async () => {
      if (!loading && !user) {
        try {
          navigate('/')
          const result = await signInWithPopup(auth, provider)
          if (!allowedEmails.includes(result.user.email)) {
            await signOut(auth)
            alert('You are not allowed to access this page')
            return
          }
          navigate('/create')
        } catch (error) {
          console.error('Error during Google sign-in:', error)
        }
      }
    }
    signIn()
  }, [user, loading, navigate])

  if (loading) return null

  return user ? children : null
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <GenerateScript />
              </ProtectedRoute>
            }
          />
          <Route
            path="/display"
            element={
              <ProtectedRoute>
                <DisplayScript />
              </ProtectedRoute>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
