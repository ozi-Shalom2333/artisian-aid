import { useRef, useState } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import { services, isDemo } from '../../services';
import useResource from '../../hooks/useResource';
import { readDemoImage } from '../../lib/files';
import Field from '../../components/shared/Field';
import Modal from '../../components/shared/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/shared/ErrorState';
export default function WorkGallery() {
  const fileInput = useRef(null);
  const resource = useResource(services.getProfile);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [remove, setRemove] = useState(null);
  async function select(e) {
    setError('');
    setImage(null);
    try {
      const image = await readDemoImage(e.target.files[0]);
      setImage(image);
    } catch (err) {
      setError(err.message);
    }
  }
  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await services.addWork({ ...image, title });
      setImage(null);
      setTitle('');
      setSuccess(
        isDemo ? 'Photo added to your local demo gallery.' : 'Photo added to your gallery.',
      );
      e.target.reset();
      resource.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  async function deletePhoto() {
    setBusy(true);
    setError('');
    try {
      await services.deleteWork(remove._id);
      setRemove(null);
      resource.reload();
      setSuccess('Photo removed from your gallery.');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  if (resource.loading) return <LoadingSpinner message="Loading your gallery…" />;
  if (resource.error) return <ErrorState description={resource.error} onRetry={resource.reload} />;
  return (
    <div className="dashboard-feature">
      <div className="panel">
        <h2>Let your work do the talking</h2>
        <p className="panel-description">
          {isDemo
            ? 'Up to four photos, stored in this browser. Use non-sensitive sample images.'
            : 'Add a photo of a project you have completed.'}
        </p>
        <form className="form-stack" onSubmit={save}>
          <Field
            label="Project or photo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            maxLength={100}
          />
          <div className="upload-area">
            <ImagePlus size={30} aria-hidden="true" />
            <label htmlFor="work-photo">Choose a work photo</label>
            <input
              id="work-photo"
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={select}
              required
            />
            <small>JPEG, PNG or WebP. Under 1 MB.</small>
          </div>
          {image && (
            <>
              <img
                className="upload-preview"
                src={image.image_url}
                alt="Selected work photo preview"
              />
              <button
                type="button"
                className="subtle-button"
                onClick={() => {
                  setImage(null);
                  fileInput.current.value = '';
                }}
              >
                Remove selected photo
              </button>
            </>
          )}
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
          <button
            className="button"
            disabled={busy || !image || (isDemo && (resource.data.portfolio?.length || 0) >= 4)}
          >
            {busy ? 'Saving…' : 'Add to gallery'}
          </button>
        </form>
      </div>
      <div className="dash-section-title">
        <h2>Your work gallery</h2>
        <span>
          {resource.data.portfolio?.length || 0}
          {isDemo ? ' / 4 photos' : ' photos'}
        </span>
      </div>
      {!resource.data.portfolio?.length ? (
        <p className="quiet-empty">Your next project photo can go right here.</p>
      ) : (
        <div className="portfolio-grid">
          {resource.data.portfolio.map((work) => (
            <figure className="gallery-item" key={work._id}>
              <img src={work.image_url} alt={work.title} />
              <figcaption>
                {work.title}
                {work.illustrative && ' · illustrative'}
              </figcaption>
              <button
                className="icon-button"
                aria-label={`Remove ${work.title}`}
                onClick={() => setRemove(work)}
              >
                <Trash2 size={17} />
              </button>
            </figure>
          ))}
        </div>
      )}
      <Modal
        open={Boolean(remove)}
        onClose={() => setRemove(null)}
        title="Remove this work photo?"
        description="It will be removed from the gallery. You can add it again from your device."
        busy={busy}
      >
        <button className="button button-danger" onClick={deletePhoto} disabled={busy}>
          {busy ? 'Removing…' : 'Remove photo'}
        </button>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
      </Modal>
    </div>
  );
}
