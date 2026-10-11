import { useState } from 'react';
import { Link } from 'react-router-dom';
import { services, isDemo } from '../services';
import { dashboardFor } from '../data/catalog';
import useAuth from '../hooks/useAuth';
import AuthLayout from '../components/auth/AuthLayout';
export default function VerificationMessage() {
  const auth = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  async function preview() {
    setBusy(true);
    try {
      await services.previewEmailVerification();
      setVerified(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <AuthLayout
      title={
        verified
          ? 'Email verification previewed.'
          : isDemo
            ? 'Your demo account is ready.'
            : 'Check your email.'
      }
      subtitle={
        isDemo
          ? 'No verification email has been sent. Preview the step here, then open your workspace.'
          : 'Use the server-issued verification link for your account.'
      }
    >
      <div className="form-stack">
        {auth.user && <p className="info-note">{auth.user.email}</p>}
        {isDemo && !verified && (
          <button
            className="button button-outline"
            onClick={preview}
            disabled={busy || !auth.isAuthenticated}
          >
            {busy ? 'Previewing…' : 'Simulate email verification'}
          </button>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
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
