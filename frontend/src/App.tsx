import './App.css'
import useAuthStore from './services/AuthStore.ts'
import React, {useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './pages/Home'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import { removeToken } from './services/Auth.ts'


const App = () => {
  
  useEffect(() => {
    const initialize = () => {
      try {
          useAuthStore.getState().initialize();
      } catch {
          removeToken();
          useAuthStore.getState().logout();
      }
  };
    initialize();
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
