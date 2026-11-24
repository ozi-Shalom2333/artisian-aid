import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useServices } from '../services/context';
import useResource from '../hooks/useResource';
import { dashboardFor } from '../data/catalog';
import Field from '../components/shared/Field';
import AuthLayout from '../components/auth/AuthLayout';
export default function RegisterForm({ role }) {
  const { services } = useServices();
  const categoriesResource = useResource(services.listCategories);
  const locationsResource = useResource(services.listLocations);
  const categories = categoriesResource.data || [];
  const locations = locationsResource.data || [];
  const navigate = useNavigate();
  const artisan = role === 'Artisan';
  const [form, setForm] = useState({
    role,
    fullname: '',
    email: '',
    phoneNumber: '',
    businessName: '',
    category: '',
    lga: '',
    password: '',
    confirmPassword: '',
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const change = (e) => setForm((value) => ({ ...value, [e.target.name]: e.target.value }));
  async function submit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('The passwords do not match.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const result = await services.register(form);
      navigate(dashboardFor(result.role));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <AuthLayout
      wide
      title={artisan ? 'Let your craft be seen.' : 'Make room for possibility.'}
      subtitle={
        artisan
          ? 'Create an artisan profile and share what you do best.'
          : 'Create a client account to request and track work.'
      }
    >
      <form className="form-stack" onSubmit={submit}>
        <div className="form-grid">
          <Field
            label="Full name"
            name="fullname"
            value={form.fullname}
            onChange={change}
            autoComplete="name"
            minLength={2}
            required
            disabled={busy}
          />
          <Field
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={change}
            autoComplete="email"
            required
            disabled={busy}
          />
          <Field
            label="Phone number"
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={change}
            autoComplete="tel"
            pattern="(?:\+234|0)[789][01]\d{8}"
            placeholder="08012345678"
            required
            disabled={busy}
          />
          <div className="form-field">
            <label htmlFor="register-area">Area in Lagos</label>
            <select
              id="register-area"
              name="lga"
              value={form.lga}
              onChange={change}
              disabled={busy}
            >
              <option value="">Select your area</option>
              {locations.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
          {artisan && (
            <>
              <Field
                label="Business name"
                name="businessName"
                value={form.businessName}
                onChange={change}
                minLength={2}
                required
                disabled={busy}
              />
              <div className="form-field">
                <label htmlFor="register-service">Your craft</label>
                <select
                  id="register-service"
                  name="category"
                  value={form.category}
                  onChange={change}
                  required
                  disabled={busy}
                >
                  <option value="">Select your service</option>
                  {categories.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.label || c.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          <Field
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={change}
            minLength={8}
            autoComplete="new-password"
            required
            disabled={busy}
            hint="At least 8 characters."
          />
          <Field
            label="Confirm password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={change}
            minLength={8}
            autoComplete="new-password"
            required
            disabled={busy}
          />
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button" disabled={busy}>
          {busy ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link> ·{' '}
        <Link to={artisan ? '/employersignup' : '/signup'}>
          {artisan ? 'Join as a client' : 'Join as an artisan'}
        </Link>
      </p>
    </AuthLayout>
  );
}
