import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { services, isDemo } from '../../services';
import useResource from '../../hooks/useResource';
import Avatar from '../../components/shared/Avatar';
import Field from '../../components/shared/Field';
import Modal from '../../components/shared/Modal';
import StatusBadge from '../../components/dashboard/StatusBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/shared/EmptyState';
import ErrorState from '../../components/shared/ErrorState';
export default function AdminQueue({ status = 'Pending' }) {
  const load = useCallback(() => services.listVerifications(status), [status]);
  const resource = useResource(load);
  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState('');
  const [declining, setDeclining] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [query, setQuery] = useState('');
  async function review(action) {
    setBusy(true);
    setError('');
    try {
      await services.reviewVerification(selected._id, action, reason);
      setSuccess(
        `${selected.fullname} was ${action.toLowerCase()}${isDemo ? ' in the demo' : ''}.`,
      );
      setSelected(null);
      resource.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  if (resource.loading) return <LoadingSpinner message="Loading the review queue…" />;
  if (resource.error) return <ErrorState description={resource.error} onRetry={resource.reload} />;
  const rows = resource.data.filter((u) =>
    `${u.fullname} ${u.email} ${u.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="dashboard-feature">
      <div className="dash-section-title">
        <h2>
          {status} profiles <span className="count-badge">{resource.data.length}</span>
        </h2>
        <div className="search-field">
          <label className="sr-only" htmlFor="queue-search">
            Search profiles
          </label>
          <input
            id="queue-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, skill or email"
          />
        </div>
      </div>
      {success && (
        <p className="success-note" role="status">
          {success}
        </p>
      )}
      {!rows.length ? (
        <EmptyState
          title={query ? 'No matching profiles' : 'The queue is clear'}
          description={
            query
              ? 'Try another name or clear your search.'
              : `No ${status.toLowerCase()} profiles need your attention.`
          }
          action={
            query ? (
              <button className="button button-outline" onClick={() => setQuery('')}>
                Clear search
              </button>
            ) : undefined
          }
        />
      ) : (
        <div className="admin-list">
          {rows.map((user) => (
            <article className="admin-row" key={user._id}>
              <Avatar name={user.fullname} image={user.profilePic?.image_url} />
              <div>
                <h3>{user.fullname}</h3>
                <p>
                  {user.businessName} · {user.location?.lga}
                </p>
                <small>{user.email}</small>
              </div>
              <StatusBadge status={user.restricted ? 'Restricted' : status} />
              <button
                className="button button-outline button-small"
                onClick={() => {
                  setSelected(user);
                  setReason('');
                  setDeclining(false);
                  setError('');
                }}
              >
                Review details
              </button>
            </article>
          ))}
        </div>
      )}
      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        busy={busy}
        title={selected?.fullname || 'Review profile'}
        description={`${selected?.category || 'Artisan'} · ${isDemo ? 'sample review, no real credential checks' : 'profile review'}`}
      >
        {selected && (
          <div className="form-stack">
            <dl className="review-details">
              <div>
                <dt>Business</dt>
                <dd>{selected.businessName}</dd>
              </div>
              <div>
                <dt>Guarantor</dt>
                <dd>{selected.verificationId?.guarantorName || 'Not supplied'}</dd>
              </div>
              <div>
                <dt>Guarantor phone</dt>
                <dd>{selected.verificationId?.guarantorPhoneNumber || 'Not supplied'}</dd>
              </div>
              <div>
                <dt>Document</dt>
                <dd>{selected.verificationId?.documentName || 'Not supplied'}</dd>
              </div>
            </dl>
            {selected.verificationId?.workCertificate?.image_url && (
              <img
                className="upload-preview"
                src={selected.verificationId.workCertificate.image_url}
                alt="Sample verification document"
              />
            )}
            {selected.verificationReason && (
              <p className="info-note">Review note: {selected.verificationReason}</p>
            )}
            {status === 'Pending' ? (
              declining ? (
                <form
                  className="form-stack"
                  onSubmit={(e) => {
                    e.preventDefault();
                    review('Declined');
                  }}
                >
                  <Field
                    label="Reason for declining"
                    value={reason}
                    multiline
                    onChange={(e) => setReason(e.target.value)}
                    minLength={10}
                    maxLength={1000}
                    required
                    hint="This note will be visible to the artisan."
                  />
                  <div className="form-actions">
                    <button
                      type="button"
                      className="button button-outline"
                      disabled={busy}
                      onClick={() => setDeclining(false)}
                    >
                      Back
                    </button>
                    <button className="button button-danger" disabled={busy}>
                      {busy ? 'Saving…' : 'Decline verification'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="form-actions">
                  <button
                    className="button button-outline"
                    disabled={busy}
                    onClick={() => setDeclining(true)}
                  >
                    Decline with a reason
                  </button>
                  <button className="button" disabled={busy} onClick={() => review('Approved')}>
                    {busy ? 'Saving…' : 'Approve verification'}
                  </button>
                </div>
              )
            ) : status === 'Approved' && !selected.restricted ? (
              <Link className="button button-outline" to={`/userprofile/${selected._id}`}>
                View public profile
              </Link>
            ) : (
              <p className="info-note">
                The artisan can submit a new sample document from their verification page.
              </p>
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
