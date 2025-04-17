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
import EmployerDashBoard from '../dashboards/employer/EmployerDashBoard';
import ResetPasswordSuccessfulMessage from '../pages/ResetPasswordSuccessfulMessage';
import GetOnePendingUser from '../dashboards/admin/pages/GetOnePendingUser';
import MeetTeam from '../pages/MeetTeam';
import PendingVerification from '../dashboards/admin/pages/PendingVerification';
import ApprovedUsers from '../dashboards/admin/pages/ApprovedUsers';
import DeclinedUsers from '../dashboards/admin/pages/DeclinedUsers';
import ReportedUsers from '../dashboards/admin/pages/ReportedUsers';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/about', element: <AboutUs /> },
            { path:'/category', element: <CategoryPage />},
            { path:'/category/:category', element: <CategoryByFilter />},
            { path:'/artisanpage' , element: <ArtisanPage/>},
            { path:'/employernotification', element: <EmployerNotification/>},
            { path: '/contact', element: <Contact /> },
        ],
    },
    {
        path: '/admindashboard',
        element: <AdminDashboard />,
        children: [
          { index: true, element: <PendingVerification /> },
          { path: 'pending-verification', element: <PendingVerification /> },
          { path: 'onePendingUser', element: <GetOnePendingUser /> },
          { path: 'approved-users', element: <ApprovedUsers /> },
          { path: 'declined-users', element: <DeclinedUsers /> },
          { path: 'reported-users', element: <ReportedUsers /> },
        ]
      },
    { path: '/signup', element: <SignUp /> },
    { path: '/employerdashboard', element: <EmployerDashBoard/>,},
    { path: '/login', element: <Login /> },
    { path: '/verify', element: <VerifyPassword /> },
    { path: '/onePendingUser', element: <GetOnePendingUser /> },
    // { path:'/admindashboard', element:<AdminDashboard/>},
    { path: '/verificationmessage', element: <VerificationMessage /> }, 
    { path: '/employerdashboard', element: <EmployerDashBoard/> },
    { path: '/authoption', element: <AuthOption /> },
    { path: '/forget', element: <ForgetPassword /> },
    { path: '/employersignup', element: <EmployerSignUp /> },
    { path: '/resetsuccess', element: <ResetPasswordSuccessfulMessage/>},
    { path: '/resetmessage', element: <ResetPasswordMessage/>},
    { path: '/verifyemail', element: <VerifyEmail /> },
    { path: '/meetTeam', element: <MeetTeam /> },
    { path: '*', element: <NotFound /> },
]);

export default Router;


