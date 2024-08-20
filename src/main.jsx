import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './views/App.jsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ShoesGrid } from './views/ShoesGrid.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/featured" replace />,
  },
  {
    path: '/featured',
    element: <App />
  },
  {
    path: ':category',
    element: <ShoesGrid />
  },
  {
    path: ':'
  },
  {
    path: '*',
    element: <p className=''>Error 404</p>
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
