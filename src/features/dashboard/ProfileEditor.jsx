import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { services, isDemo } from '../../services';
import useResource from '../../hooks/useResource';
import { locations } from '../../data/catalog';
import { readDemoImage } from '../../lib/files';
import Field from '../../components/shared/Field';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/shared/ErrorState';
function ProfileForm({ user }) {
  const fileInputs = useRef({});
  const [saved, setSaved] = useState(user);
  const [readingImages, setReadingImages] = useState(0);
  const [form, setForm] = useState({
    fullname: user.fullname,
    businessName: user.businessName || '',
    bio: user.bio || '',
    lga: user.location?.lga || 'Ikeja',
    socialMediaLink: user.socialMediaLink || '',
    availability: user.availability ?? true,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const change = (e) => {
    setForm((v) => ({
      ...v,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
    setSuccess('');
  };
  async function image(e, key) {
    setReadingImages((count) => count + 1);
    setSuccess('');
    setForm((value) => {
      const next = { ...value };
      delete next[key];
      return next;
    });
    try {
      const result = await readDemoImage(e.target.files[0]);
      setForm((v) => ({ ...v, [key]: result.image_url }));
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setReadingImages((count) => count - 1);
    }
  }
  async function save(e) {
    e.preventDefault();
    if (readingImages) {
      setError('Wait for the photo preview before saving.');
      return;
    }
    setBusy(true);
    setError('');
    setSuccess('');
    try {
      const updated = await services.updateProfile(form);
      setSaved(updated);
      setForm((value) => {
        const next = { ...value };
        delete next.profilePic;
        delete next.coverPhoto;
        return next;
      });
      Object.values(fileInputs.current).forEach((input) => {
        if (input) input.value = '';
      });
      setSuccess(isDemo ? 'Your demo profile is saved in this browser.' : 'Your profile is saved.');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="panel">
      <div className="panel-heading">
        <div>
          <h2>Make a good introduction</h2>
          <p>The small details help people get to know you.</p>
        </div>
        {user.role === 'Artisan' && user.verificationStatus === 'Approved' && (
          <Link className="text-link small-link" to={`/userprofile/${user._id}`}>
            View public profile ↗
          </Link>
        )}
      </div>
      <form className="form-stack" onSubmit={save}>
        <div className="form-grid">
          <Field
            label="Full name"
            name="fullname"
            value={form.fullname}
            onChange={change}
            minLength={2}
            maxLength={80}
            required
            disabled={busy}
          />
          <Field
            label="Account email"
            value={user.email}
            readOnly
            hint="Email changes require backend verification."
          />
          {user.role === 'Artisan' && (
            <Field
              label="Business name"
              name="businessName"
              value={form.businessName}
              onChange={change}
              required
              minLength={2}
              maxLength={100}
              disabled={busy}
            />
          )}
          <div className="form-field">
            <label htmlFor="profile-area">Area in Lagos</label>
            <select id="profile-area" name="lga" value={form.lga} onChange={change} disabled={busy}>
              {locations.map((area) => (
                <option key={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>
        <Field
          label="A little about you"
          name="bio"
          multiline
          maxLength={1500}
          value={form.bio}
          onChange={change}
          disabled={busy}
        />
        {user.role === 'Artisan' && (
          <>
            <Field
              label="Social profile link (optional)"
              name="socialMediaLink"
              type="url"
              value={form.socialMediaLink}
              onChange={change}
              placeholder="https://"
              disabled={busy}
            />
            <label className="check-label">
              <input
                name="availability"
                type="checkbox"
                checked={form.availability}
                onChange={change}
                disabled={busy}
              />
              I’m open to new project requests
            </label>
          </>
        )}
        <div className="form-grid">
          {['profilePic', 'coverPhoto'].map((key) => (
            <div className="form-field" key={key}>
              <label htmlFor={`photo-${key}`}>
                {key === 'profilePic' ? 'Profile photo' : 'Cover photo'}
              </label>
              <input
                id={`photo-${key}`}
                ref={(node) => {
                  fileInputs.current[key] = node;
                }}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => image(e, key)}
                disabled={busy || readingImages > 0}
              />
              <small>JPEG, PNG or WebP. Under 1 MB. Preview before saving.</small>
              {(form[key] || saved[key]?.image_url) && (
                <img
                  className="upload-preview-small"
                  src={form[key] || saved[key]?.image_url}
                  alt={key === 'profilePic' ? 'Profile photo preview' : 'Cover photo preview'}
                />
              )}
              {form[key] && (
                <button
                  type="button"
                  className="subtle-button"
                  onClick={() => {
                    fileInputs.current[key].value = '';
                    setForm((v) => {
                      const next = { ...v };
                      delete next[key];
                      return next;
                    });
                  }}
                >
                  Remove selected photo
                </button>
              )}
            </div>
          ))}
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="success-note" role="status">
            {success}
          </p>
        )}
        <button className="button" disabled={busy || readingImages > 0}>
          {busy ? 'Saving…' : readingImages ? 'Preparing photo…' : 'Save profile'}
        </button>
      </form>
    </div>
  );
}
export default function ProfileEditor() {
  const resource = useResource(services.getProfile);
  if (resource.loading) return <LoadingSpinner message="Loading your profile…" />;
  if (resource.error) return <ErrorState description={resource.error} onRetry={resource.reload} />;
  return <ProfileForm key={resource.data._id} user={resource.data} />;
}
