import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import App from '../App';
import AboutUs from '../pages/AboutUs';
import Contact from '../pages/Contact';
import CategoryByFilter from '../pages/CategoryByFilter';
import SignUp from '../auth/SignUp';
import Login from '../auth/Login';
import NotFound from '../pages/NotFound';
import VerifyPassword from '../auth/VerifyPassword';
import ForgetPassword from '../auth/ForgetPassword';
import CategoryPage from '../pages/CategoryPage';
import ArtisanPage from '../pages/ArtisanPage';
import EmployerNotification from '../pages/EmployerNotification';
import EmployerDashBoard from '../pages/EmployerDashBoard';
import EmployerSignUp from '../auth/EmployerSignUp';
import VerifyEmail from '../auth/VerifyEmail';
import AuthOption from '../pages/AuthOption';
import VerificationMessage from '../pages/VerificationMessage'; 
import ResetPasswordMessage from '../pages/ResetPasswordMessage';
import ResetPasswordSuccessfulMessage from '../pages/ResetPasswordSuccessfulMessage';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/about', element: <AboutUs /> },
            { path:'/category', element: <CategoryPage /> },
            { path:'/category/:category', element: <CategoryByFilter /> },
            { path:'/artisanpage' , element: <ArtisanPage /> },
            { path: '/verificationmessage', element: <VerificationMessage /> }, 
            { path:'/employernotification', element: <EmployerNotification /> },
            { path: '/employerdashboard', element: <EmployerDashBoard /> },
            { path: '/authoption', element: <AuthOption /> },
            { path: '/resetmessage', element: <ResetPasswordMessage/>},
            { path: '/resetsuccess', element: <ResetPasswordSuccessfulMessage/>},
            { path: '/contact', element: <Contact /> },
        ],
    },
    { path: '/signup', element: <SignUp /> },
    { path: '/login', element: <Login /> },
    { path: '/verify', element: <VerifyPassword /> },
    { path: '/forget', element: <ForgetPassword /> },
    { path: '/employersignup', element: <EmployerSignUp /> },
    { path: '/verifyemail', element: <VerifyEmail /> },
    { path: '*', element: <NotFound /> },
]);

export default Router;


