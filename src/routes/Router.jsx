import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import App from '../App';
import AboutUs from '../pages/AboutUs';
import Contact from '../pages/Contact';
import CategoryByFilter from '../pages/CategoryByFilter';
import SignUp from '../auth/SignUp';
import Login from '../auth/Login';
import NotFound from '../pages/NotFound';
import ResetPassword from '../auth/ResetPassword';
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
import GetOnePendingUser from '../dashboards/admin/pages/GetOnePendingUser';
import MeetTeam from '../pages/MeetTeam';
import PendingVerification from '../dashboards/admin/pages/PendingVerification';
import ApprovedUsers from '../dashboards/admin/pages/ApprovedUsers';
import DeclinedUsers from '../dashboards/admin/pages/DeclinedUsers';
import ReportedUsers from '../dashboards/admin/pages/ReportedUsers';
import GetOneReported from '../dashboards/admin/pages/GetOneReported';
import ArtisanDashoard from '../dashboards/artisan/ArtisanDashoard';
import EmployerDash from '../dashboards/employer/EmployerDash';
import UserProfile from '../dashboards/employer/pages/UserProfile';
import SubscriptionVerification from '../dashboards/employer/pages/SubscriptionVerification';
import PrivateRoute from './PrivateRoute';

const Router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutUs /> },
      { path: '/category', element: <CategoryPage /> },
      { path: '/artisanpage', element: <ArtisanPage /> },
      { path: '/employernotification', element: <EmployerNotification /> },
      { path: '/contact', element: <Contact /> },
      { path: '/meetTeam', element: <MeetTeam /> },
    ],
  },
  {
    element: <PrivateRoute allowedRoles={['Admin']} />,
    children: [
      {
        path: '/admindashboard',
        element: <AdminDashboard />,
        children: [
          { index: true, element: <PendingVerification /> },
          { path: 'pending-verification', element: <PendingVerification /> },
          { path: 'onePendingUser', element: <GetOnePendingUser /> },
          { path: 'getOneReported/:id', element: <GetOneReported /> },
          { path: 'approved-users', element: <ApprovedUsers /> },
          { path: 'declined-users', element: <DeclinedUsers /> },
          { path: 'reported-users', element: <ReportedUsers /> },
        ],
      },
      { path: '/onePendingUser', element: <GetOnePendingUser /> },
    ],
  },
  {
    element: <PrivateRoute allowedRoles={['Artisan']} />,
    children: [
      { path: '/artisandashboard', element: <ArtisanDashoard /> },
    ],
  },
  {
    element: <PrivateRoute allowedRoles={['Employer']} />,
    children: [
      { path: '/employerdashboard', element: <EmployerDash /> },
      { path: '/userprofile/:userId', element: <UserProfile /> },
      { path: '/subscriptionverified', element: <SubscriptionVerification /> },
    ],
  },
  { path: '/signup', element: <SignUp /> },
  { path: '/login', element: <Login /> },
  { path: '/category/:category', element: <CategoryByFilter /> },
  { path: '/resetpassword/:token', element: <ResetPassword /> },
  { path: '/verificationmessage', element: <VerificationMessage /> },
  { path: '/authoption', element: <AuthOption /> },
  { path: '/forget', element: <ForgetPassword /> },
  { path: '/employersignup', element: <EmployerSignUp /> },
  { path: '/resetsuccess', element: <ResetPasswordSuccessfulMessage /> },
  { path: '/resetmessage', element: <ResetPasswordMessage /> },
{ path: '/verifyemail/:token', element: <VerifyEmail />},
  { path: '*', element: <NotFound /> },
]);

export default Router;