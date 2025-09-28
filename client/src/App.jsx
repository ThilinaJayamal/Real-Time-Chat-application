import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SettingsPage from './pages/SettingsPage'
import { useAuthStore } from './store/authStore'
import { Loader } from 'lucide-react';
import ProfilePage from './pages/ProfilePage'
import { Toaster } from "react-hot-toast"
import { useThemeStore } from './store/themeStore'
import { useChatStore } from './store/chatStore'

function App() {
  const { checkAuth, authUser, isCheckingAuth, onlineUsers } = useAuthStore();
  const { unSubscribeFromMessage } = useChatStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
    return () => {
      unSubscribeFromMessage();
    }
  }, [])

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen w-full'>
        <Loader className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <div className='min-w-full min-h-lvh' data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App