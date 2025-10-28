import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { GlobalLoader } from './components/GlobalLoader'
import { cn } from './lib/utils'

function App() {
  const { loading } = useAuth()
  const location = useLocation()
  const isAuthPage = ['/login', '/unauthorized'].includes(location.pathname)

  if (loading) {
    return <GlobalLoader />
  }

  return (
    <div
      className={cn(
        'flex h-screen w-full',
        isAuthPage
          ? 'min-h-screen flex-col items-center justify-center bg-[length:200%_200%] bg-gradient-to-br from-background via-stone-200 to-background p-4 animate-gradient-shift'
          : '',
      )}
    >
      <Outlet />
    </div>
  )
}

export default App