import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './views/App.jsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Shoes } from './views/Shoes.jsx'
import men from './json/menshoes.json'
import women from './json/womenshoes.json'
import kids from './json/kidsshoes.json'
import sale from './json/saleshoes.json'

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
    path: '/men',
    element: <Shoes json={men} />
  },
  {
    path: '/women',
    element: <Shoes json={women} />
  },
  {
    path: '/kids',
    element: <Shoes json={kids} />
  },
  {
    path: '/sale',
    element: <Shoes json={sale} />
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
