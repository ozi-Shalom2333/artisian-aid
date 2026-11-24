import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import Field from '../components/shared/Field';
import { useServices } from '../services/context';
export default function ForgetPassword() {
  const { services } = useServices();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await services.requestPasswordReset(email);
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <AuthLayout
      title={done ? 'Check your email.' : 'Need a fresh start?'}
      subtitle="Enter your account email to request a reset link."
    >
      {done ? (
        <div className="form-stack">
          <p className="success-note" role="status">
            If an account exists for this email, the server will send a recovery link.
          </p>
          <Link className="button" to="/login">
            Back to sign in
          </Link>
          <button className="subtle-button" onClick={() => setDone(false)}>
            Try another email
          </button>
        </div>
      ) : (
        <form className="form-stack" onSubmit={submit}>
          <Field
            label="Account email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button" disabled={busy}>
            {busy ? 'Checking…' : 'Request reset link'}
          </button>
          <Link className="text-link" to="/login">
            Back to sign in
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
