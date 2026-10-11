import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
export default function ResetPassword() {
  return (
    <AuthLayout
      title="Password recovery needs a secure connection."
      subtitle="This frontend demo cannot validate a reset token or change a real password."
    >
      <div className="form-stack">
        <p className="info-note">
          Demo accounts always use Demo123!. A future backend must validate time-limited tokens and
          securely update credentials.
        </p>
        <Link className="button" to="/login">
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
