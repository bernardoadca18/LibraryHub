import './App.css'

import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
