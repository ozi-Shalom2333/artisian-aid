import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Eye, EyeOff } from 'lucide-react';
import { services, isDemo } from '../services';
import { dashboardFor, demoAccounts, DEMO_PASSWORD } from '../data/catalog';
import AuthLayout from '../components/auth/AuthLayout';
import Field from '../components/shared/Field';
export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function signIn(input) {
    setBusy(true);
    setError('');
    try {
      const result = await services.login(input);
      const next = params.get('next');
      const safeNext = next && /^\/userprofile\/[^/]+(?:\?|$)/.test(next);
      navigate(result.role === 'Employer' && safeNext ? next : dashboardFor(result.role), {
        replace: true,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <AuthLayout title="Welcome back." subtitle="Sign in to manage your projects and profile.">
      {isDemo && (
        <p className="sample-note login-notice">
          Live sign-in is unavailable. Use a sample account below, or an account created in this
          browser. Use sample details only.
        </p>
      )}
      <form
        className="form-stack"
        onSubmit={(e) => {
          e.preventDefault();
          signIn({ identifier, password });
        }}
      >
        <Field
          label="Email or phone number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          autoComplete="username"
          placeholder={isDemo ? 'chidinma@artisanaid.ng' : 'you@example.com'}
          disabled={busy}
          required
        />
        <div className="password-field">
          <Field
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={visible ? 'text' : 'password'}
            autoComplete="current-password"
            disabled={busy}
            required
          />
          <button
            type="button"
            className="icon-button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <Link className="text-link small-link" to="/forget">
          Forgot password?
        </Link>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
          <ArrowUpRight size={17} />
        </button>
      </form>
      {isDemo && (
        <details className="demo-login">
          <summary>Explore with a sample account</summary>
          {demoAccounts.map((account) => (
            <button
              className="demo-role"
              key={account.role}
              disabled={busy}
              onClick={() => signIn({ identifier: account.email, password: DEMO_PASSWORD })}
            >
              <span>
                <strong>{account.role === 'Employer' ? 'Client / Employer' : account.role}</strong>
                <small>{account.label}</small>
              </span>
              <ArrowUpRight size={18} />
            </button>
          ))}
          <p>
            Every sample account uses <strong>{DEMO_PASSWORD}</strong>. Sign-in is simulated and
            passwords are not stored.
          </p>
        </details>
      )}
      <p className="auth-switch">
        New around here? <Link to="/authoption">Create an account</Link>
      </p>
    </AuthLayout>
  );
}
