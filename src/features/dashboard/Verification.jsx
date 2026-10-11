import { useRef, useState } from 'react';
import { services, isDemo } from '../../services';
import { readDemoImage } from '../../lib/files';
import useResource from '../../hooks/useResource';
import Field from '../../components/shared/Field';
import StatusBadge from '../../components/dashboard/StatusBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/shared/ErrorState';
export default function Verification() {
  const fileInput = useRef(null);
  const resource = useResource(services.getProfile);
  const [form, setForm] = useState({ guarantorName: '', guarantorPhoneNumber: '' });
  const [image, setImage] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  async function select(e) {
    setImage(null);
    setError('');
    try {
      setImage(await readDemoImage(e.target.files[0]));
    } catch (err) {
      setError(err.message);
    }
  }
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await services.submitVerification({ ...form, ...image });
      setSuccess(
        isDemo
          ? 'Demo verification submitted. Switch to Admin to review it.'
          : 'Your verification is awaiting review.',
      );
      resource.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  if (resource.loading) return <LoadingSpinner message="Checking verification status…" />;
  if (resource.error) return <ErrorState description={resource.error} onRetry={resource.reload} />;
  const user = resource.data;
  const maySubmit = ['Unverified', 'Declined'].includes(user.verificationStatus);
  return (
    <div className="panel">
      <div className="panel-heading">
        <div>
          <h2>A little more confidence</h2>
          <p>Manage your artisan profile review.</p>
        </div>
        <StatusBadge status={user.verificationStatus} />
      </div>
      {isDemo && (
        <p className="info-note">
          Demo review only. No identity, skill or background checks are performed. Use a sample
          image, never a real identity document.
        </p>
      )}
      {success && (
        <p className="success-note" role="status">
          {success}
        </p>
      )}
      {user.verificationStatus === 'Approved' ? (
        <div className="quiet-empty">
          <h3>{isDemo ? 'Your demo profile is approved' : 'Your profile is approved'}</h3>
          <p>
            {isDemo
              ? 'It is visible in discovery. This status represents a sample review, not a real credential check.'
              : 'Your profile is now visible in discovery.'}
          </p>
        </div>
      ) : user.verificationStatus === 'Pending' ? (
        <div className="quiet-empty">
          <h3>Your profile is in the review queue</h3>
          <p>
            {isDemo
              ? 'The demo administrator can approve or decline it. There is no automatic approval or real verification service.'
              : 'An administrator will review your submission.'}
          </p>
          <p>Document: {user.verificationId?.documentName}</p>
        </div>
      ) : null}
      {user.verificationReason && (
        <p className="form-error">Review note: {user.verificationReason}</p>
      )}
      {maySubmit && (
        <form className="form-stack" onSubmit={submit}>
          <Field
            label={isDemo ? 'Sample guarantor name' : 'Guarantor name'}
            value={form.guarantorName}
            minLength={2}
            required
            onChange={(e) => setForm((v) => ({ ...v, guarantorName: e.target.value }))}
          />
          <Field
            label={isDemo ? 'Sample guarantor phone' : 'Guarantor phone'}
            value={form.guarantorPhoneNumber}
            type="tel"
            pattern="(?:\+234|0)[789][01]\d{8}"
            required
            onChange={(e) => setForm((v) => ({ ...v, guarantorPhoneNumber: e.target.value }))}
          />
          <div className="upload-area">
            <label htmlFor="verification-file">
              {isDemo ? 'Choose a sample document image' : 'Choose a document image'}
            </label>
            <input
              id="verification-file"
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              onChange={select}
            />
            <small>
              JPEG, PNG or WebP, under 1 MB. PDF uploads require future storage integration.
            </small>
          </div>
          {image && (
            <>
              <img className="upload-preview" src={image.image_url} alt="Sample document preview" />
              <button
                type="button"
                className="subtle-button"
                onClick={() => {
                  setImage(null);
                  fileInput.current.value = '';
                }}
              >
                Remove selected document
              </button>
            </>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button" disabled={busy || !image}>
            {busy ? 'Submitting…' : isDemo ? 'Submit demo verification' : 'Submit verification'}
          </button>
        </form>
      )}
    </div>
  );
}
