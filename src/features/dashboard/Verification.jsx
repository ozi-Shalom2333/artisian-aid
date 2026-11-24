import { useRef, useState } from 'react';
import { useServices } from '../../services/context';
import { readImageFile } from '../../lib/files';
import useResource from '../../hooks/useResource';
import Field from '../../components/shared/Field';
import StatusBadge from '../../components/dashboard/StatusBadge';
import ErrorState from '../../components/shared/ErrorState';
import { Skeleton } from '../../components/ui/skeleton';
export default function Verification() {
  const { services } = useServices();
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
      setImage(await readImageFile(e.target.files[0]));
    } catch (err) {
      setError(err.message);
    }
  }
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    setSuccess('');
    try {
      await services.submitVerification({ ...form, ...image });
      setSuccess('Your verification is awaiting review.');
      resource.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  if (resource.loading)
    return (
      <div className="panel space-y-6" role="status" aria-label="Checking verification status">
        <div className="panel-heading">
          <div className="space-y-2">
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    );
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
      {success && (
        <p className="success-note" role="status">
          {success}
        </p>
      )}
      {user.verificationStatus === 'Approved' ? (
        <div className="quiet-empty">
          <h3>Your profile is approved</h3>
          <p>Your profile is now visible in discovery.</p>
        </div>
      ) : user.verificationStatus === 'Pending' ? (
        <div className="quiet-empty">
          <h3>Your profile is in the review queue</h3>
          <p>An administrator will review your submission.</p>
          <p>Document: {user.verificationId?.documentName}</p>
        </div>
      ) : null}
      {user.verificationReason && (
        <p className="form-error">Review note: {user.verificationReason}</p>
      )}
      {maySubmit && (
        <form className="form-stack" onSubmit={submit}>
          <Field
            label="Guarantor name"
            value={form.guarantorName}
            minLength={2}
            required
            onChange={(e) => setForm((v) => ({ ...v, guarantorName: e.target.value }))}
          />
          <Field
            label="Guarantor phone"
            value={form.guarantorPhoneNumber}
            type="tel"
            pattern="(?:\+234|0)[789][01]\d{8}"
            required
            onChange={(e) => setForm((v) => ({ ...v, guarantorPhoneNumber: e.target.value }))}
          />
          <div className="upload-area">
            <label htmlFor="verification-file">Choose a document image</label>
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
              <img className="upload-preview" src={image.image_url} alt="Document preview" />
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
            {busy ? 'Submitting…' : 'Submit verification'}
          </button>
        </form>
      )}
    </div>
  );
}
