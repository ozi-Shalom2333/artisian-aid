import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { dashboardFor } from '../data/catalog';
export default function PrivateRoute({ allowedRoles }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.isAuthenticated)
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  if (!allowedRoles.includes(auth.role)) return <Navigate to={dashboardFor(auth.role)} replace />;
  return <Outlet />;
}
