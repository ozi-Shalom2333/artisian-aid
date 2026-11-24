import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
export default function ResetPassword() {
  return (
    <AuthLayout
      title="Password reset is unavailable."
      subtitle="Your password has not changed. Please request a new link when account recovery is available."
    >
      <div className="form-stack">
        <Link className="text-link" to="/forget">
          Request account recovery
        </Link>
        <Link className="button" to="/login">
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
