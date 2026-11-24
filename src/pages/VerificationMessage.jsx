import { Link } from 'react-router-dom';
import { dashboardFor } from '../data/catalog';
import useAuth from '../hooks/useAuth';
import AuthLayout from '../components/auth/AuthLayout';
export default function VerificationMessage() {
  const auth = useAuth();
  return (
    <AuthLayout
      title="Email confirmation is unavailable."
      subtitle="We could not confirm this link. Your email status has not changed."
    >
      <div className="form-stack">
        {auth.user && <p className="info-note">{auth.user.email}</p>}
        <Link className="button" to={dashboardFor(auth.role)}>
          Open my workspace
        </Link>
        <Link className="text-link" to="/login">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
