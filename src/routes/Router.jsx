import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import App from '../App'
import AboutUs from '../pages/AboutUs'
import Contact from '../pages/Contact'
import SignUp from '../auth/SignUp'
import Login from '../auth/Login'
import NotFound from '../pages/NotFound'

const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:[
            {path: '/', element: <HomePage />},
            {path: '/about', element: <AboutUs />},
            {path: '/contact', element: <Contact />},
           
        ]
    },
    {path: '/signup', element: <SignUp />},
    {path: '/login', element: <Login/>},
    {path: '*', element: <NotFound/>},
])
 

export default Router
