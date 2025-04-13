import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router'
import AdminDashboard from './dashboards/admin/AdminDashboard'




createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AdminDashboard/>
    {/* <RouterProvider router={Router}/> */}
  </StrictMode>,
)
