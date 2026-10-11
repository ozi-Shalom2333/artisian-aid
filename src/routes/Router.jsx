import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import PublicLayout from '../components/PublicLayout';
import PrivateRoute from './PrivateRoute';
import LoadingSpinner from '../components/LoadingSpinner';
const HomePage = lazy(() => import('../pages/HomePage'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const Contact = lazy(() => import('../pages/Contact'));
const ArtisanPage = lazy(() => import('../pages/ArtisanPage'));
const CategoryPage = lazy(() => import('../pages/CategoryPage'));
const ArtisanProfile = lazy(() => import('../pages/ArtisanProfile'));
const DemoGuide = lazy(() => import('../pages/DemoGuide'));
const MeetTeam = lazy(() => import('../pages/MeetTeam'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Login = lazy(() => import('../auth/Login'));
const SignUp = lazy(() => import('../auth/SignUp'));
const EmployerSignUp = lazy(() => import('../auth/EmployerSignUp'));
const AuthOption = lazy(() => import('../pages/AuthOption'));
const VerificationMessage = lazy(() => import('../pages/VerificationMessage'));
const ForgetPassword = lazy(() => import('../auth/ForgetPassword'));
const ResetPassword = lazy(() => import('../auth/ResetPassword'));
const EmployerDash = lazy(() => import('../dashboards/employer/EmployerDash'));
const ArtisanDashboard = lazy(() => import('../dashboards/artisan/ArtisanDashboard'));
const AdminDashboard = lazy(() => import('../dashboards/admin/AdminDashboard'));
const AdminQueue = lazy(() => import('../features/dashboard/AdminQueue'));
const Reports = lazy(() => import('../features/dashboard/Reports'));
const render = (Component, props) => (
  <Suspense fallback={<LoadingSpinner message="Opening Artisan Aid…" />}>
    <Component {...props} />
  </Suspense>
);
export const routes = [
  {
    element: <App />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: '/', element: render(HomePage) },
          { path: '/about', element: render(AboutUs) },
          { path: '/contact', element: render(Contact) },
          { path: '/artisanpage', element: render(ArtisanPage) },
          { path: '/category', element: render(CategoryPage) },
          { path: '/category/:nameOfCategory', element: render(ArtisanPage) },
          { path: '/userprofile/:userId', element: render(ArtisanProfile) },
          { path: '/demo', element: render(DemoGuide) },
          { path: '/meetTeam', element: render(MeetTeam) },
          { path: '*', element: render(NotFound) },
        ],
      },
      { path: '/login', element: render(Login) },
      { path: '/signup', element: render(SignUp) },
      { path: '/employersignup', element: render(EmployerSignUp) },
      { path: '/authoption', element: render(AuthOption) },
      { path: '/forget', element: render(ForgetPassword) },
      { path: '/forgetpassword', element: <Navigate to="/forget" replace /> },
      { path: '/verificationmessage', element: render(VerificationMessage) },
      { path: '/verifyemail/:token', element: render(VerificationMessage) },
      { path: '/resetpassword/:token', element: render(ResetPassword) },
      { path: '/resetmessage', element: <Navigate to="/forget" replace /> },
      { path: '/resetsuccess', element: render(ResetPassword) },
      {
        element: <PrivateRoute allowedRoles={['Employer']} />,
        children: [
          { path: '/employerdashboard', element: render(EmployerDash) },
          {
            path: '/employernotification',
            element: <Navigate to="/employerdashboard?tab=requests" replace />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={['Artisan']} />,
        children: [
          { path: '/artisandashboard', element: render(ArtisanDashboard) },
          {
            path: '/subscriptionverified',
            element: <Navigate to="/artisandashboard?tab=plans" replace />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={['Admin']} />,
        children: [
          {
            path: '/admindashboard',
            element: render(AdminDashboard),
            children: [
              { index: true, element: render(AdminQueue, { status: 'Pending' }) },
              { path: 'pending-verification', element: render(AdminQueue, { status: 'Pending' }) },
              { path: 'approved-users', element: render(AdminQueue, { status: 'Approved' }) },
              { path: 'declined-users', element: render(AdminQueue, { status: 'Declined' }) },
              { path: 'reported-users', element: render(Reports) },
              {
                path: 'onePendingUser',
                element: <Navigate to="/admindashboard/pending-verification" replace />,
              },
              {
                path: 'getOneReported/:id',
                element: <Navigate to="/admindashboard/reported-users" replace />,
              },
            ],
          },
          {
            path: '/onePendingUser',
            element: <Navigate to="/admindashboard/pending-verification" replace />,
          },
        ],
      },
    ],
  },
];
export default createBrowserRouter(routes);
