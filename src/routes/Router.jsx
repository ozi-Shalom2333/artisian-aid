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
import EmployerSignUp from '../auth/EmployerSignUp';
import VerifyEmail from '../auth/VerifyEmail';
import AuthOption from '../pages/AuthOption';
import VerificationMessage from '../pages/VerificationMessage'; 
import AdminDashboard from '../dashboards/admin/AdminDashboard';
import ResetPasswordMessage from '../pages/ResetPasswordMessage';
import ResetPasswordSuccessfulMessage from '../pages/ResetPasswordSuccessfulMessage';
import ArtisanDashoard from '../dashboards/artisan/ArtisanDashoard';
import EmployerDash from '../dashboards/employer/EmployerDash';


const Router = createBrowserRouter([
    {
        element: <App />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/about', element: <AboutUs /> },
            { path:'/category', element: <CategoryPage />},
           
            { path:'/artisanpage' , element: <ArtisanPage/>},
            { path:'/employernotification', element: <EmployerNotification/>},
            { path: '/contact', element: <Contact /> },
        ],
    },
    { path: '/signup', element: <SignUp /> },
    { path: '/login', element: <Login /> },
    { path:'/category/:category', element: <CategoryByFilter />},
    { path: '/verify', element: <VerifyPassword /> },
    { path:'/admindashboard', element:<AdminDashboard/>},
    { path: '/verificationmessage', element: <VerificationMessage /> }, 
    {path: '/artisandashboard', element: <ArtisanDashoard/>},
    { path: '/employerdashboard', element: <EmployerDash/> },
    { path: '/authoption', element: <AuthOption /> },
    { path: '/forget', element: <ForgetPassword /> },
    { path: '/employersignup', element: <EmployerSignUp /> },
    { path: '/resetsuccess', element: <ResetPasswordSuccessfulMessage/>},
    { path: '/resetmessage', element: <ResetPasswordMessage/>},
    { path: '/verifyemail/:token', element: <VerifyEmail /> },
    { path: '*', element: <NotFound /> },
]);

export default Router;


