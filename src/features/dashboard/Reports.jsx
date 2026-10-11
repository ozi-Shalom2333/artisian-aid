import { useState } from 'react';
import { services, isDemo } from '../../services';
import useResource from '../../hooks/useResource';
import Avatar from '../../components/shared/Avatar';
import Modal from '../../components/shared/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/shared/ErrorState';
import EmptyState from '../../components/shared/EmptyState';
export default function Reports() {
  const resource = useResource(services.listReports);
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  async function resolve() {
    setBusy(true);
    setError('');
    try {
      await services.resolveReport(selected._id, action);
      setSuccess(`Report handled: ${action.toLowerCase()}${isDemo ? ' in the demo' : ''}.`);
      setSelected(null);
      resource.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  if (resource.loading) return <LoadingSpinner message="Loading reports…" />;
  if (resource.error) return <ErrorState description={resource.error} onRetry={resource.reload} />;
  return (
    <div className="dashboard-feature">
      <div className="dash-section-title">
        <h2>
          Reports to review <span className="count-badge">{resource.data.length}</span>
        </h2>
      </div>
      {success && (
        <p className="success-note" role="status">
          {success}
        </p>
      )}
      {!resource.data.length ? (
        <EmptyState
          title="No open reports"
          description="New reports will appear here for review."
        />
      ) : (
        resource.data.map((report) => (
          <article className="panel report-panel" key={report._id}>
            <div className="report-person">
              <Avatar name={report.artisan.fullname} image={report.artisan.profilePic?.image_url} />
              <div>
                <h3>{report.artisan.fullname}</h3>
                <p>Reported by {report.employer.fullname}</p>
              </div>
            </div>
            <p className="report-reason">{report.reason}</p>
            <p className="sample-note">
              {new Date(report.createdAt).toLocaleDateString('en-NG')} ·{' '}
              {isDemo ? 'Fictional report' : 'Open report'}
            </p>
            <div className="inline-actions">
              {[
                ['Dismissed', 'Dismiss report'],
                ['Restricted', 'Restrict profile'],
                ['Deleted', 'Remove profile'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  className={`button button-small ${value === 'Deleted' ? 'button-danger' : 'button-outline'}`}
                  onClick={() => {
                    setSelected(report);
                    setAction(value);
                    setError('');
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </article>
        ))
      )}
      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        busy={busy}
        title={
          action === 'Dismissed'
            ? 'Dismiss this report?'
            : action === 'Restricted'
              ? 'Restrict this profile?'
              : 'Remove this profile from discovery?'
        }
        description={
          action === 'Dismissed'
            ? 'The report will leave the open queue.'
            : 'The profile will be hidden and its account will no longer be able to sign in. The record remains for review. Demo reset restores sample data.'
        }
      >
        <button
          className={`button ${action !== 'Dismissed' ? 'button-danger' : ''}`}
          onClick={resolve}
          disabled={busy}
        >
          {busy ? 'Saving…' : 'Confirm action'}
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
