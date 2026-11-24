import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, ArrowUpRight } from 'lucide-react';
import { useServices } from '../../services/context';
import useResource from '../../hooks/useResource';
import useAuth from '../../hooks/useAuth';
import StatusBadge from '../../components/dashboard/StatusBadge';
import ErrorState from '../../components/shared/ErrorState';
import EmptyState from '../../components/shared/EmptyState';
import { Skeleton } from '../../components/ui/skeleton';
const labels = {
  All: 'All requests',
  Pending: 'Awaiting response',
  Confirmed: 'Confirmed',
  Rejected: 'Declined',
};
export default function Bookings() {
  const { services } = useServices();
  const resource = useResource(services.listBookings);
  const auth = useAuth();
  const [filter, setFilter] = useState('All');
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  async function respond(id, status) {
    setBusy(id);
    setError('');
    setSuccess('');
    try {
      await services.respondToBooking(id, status);
      setSuccess(
        `Request ${status === 'Confirmed' ? 'confirmed' : 'declined'}. The client dashboard now shows this response.`,
      );
      resource.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy('');
    }
  }
  if (resource.loading)
    return (
      <div className="dashboard-feature" role="status" aria-label="Loading your requests">
        <div className="stat-row">
          {[1, 2, 3].map((n) => (
            <div key={n} className="stat-card space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-9 w-16" />
              <Skeleton className="h-3 w-36" />
            </div>
          ))}
        </div>
        <div className="booking-list">
          {[1, 2].map((n) => (
            <div key={n} className="booking-card space-y-4">
              <div className="booking-top">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-4 w-64" />
            </div>
          ))}
        </div>
      </div>
    );
  if (resource.error) return <ErrorState description={resource.error} onRetry={resource.reload} />;
  const rows = resource.data.filter((booking) => filter === 'All' || booking.status === filter);
  return (
    <div className="dashboard-feature">
      <div className="stat-row">
        {['Pending', 'Confirmed', 'Rejected'].map((status) => (
          <div key={status} className="stat-card">
            <p>{labels[status]}</p>
            <strong>
              {resource.data
                .filter((b) => b.status === status)
                .length.toString()
                .padStart(2, '0')}
            </strong>
            <span>
              {auth.role === 'Artisan' ? 'In your job requests' : 'In your project requests'}
            </span>
          </div>
        ))}
      </div>
      <div className="dash-section-title">
        <h2>{auth.role === 'Artisan' ? 'Your job requests' : 'Your project requests'}</h2>
        {auth.role === 'Employer' && (
          <Link className="button button-small" to="/artisanpage">
            Find an artisan <ArrowUpRight size={16} />
          </Link>
        )}
      </div>
      <div className="filter-chips" aria-label="Filter requests">
        {Object.entries(labels).map(([key, label]) => (
          <button
            aria-pressed={filter === key}
            className={filter === key ? 'active' : ''}
            key={key}
            onClick={() => setFilter(key)}
          >
            {label}{' '}
            <span>{resource.data.filter((b) => key === 'All' || b.status === key).length}</span>
          </button>
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
      {!rows.length ? (
        <EmptyState
          title="A little breathing room"
          description={
            filter === 'All'
              ? 'Your requests will appear here when a project gets started.'
              : `You have no ${labels[filter].toLowerCase()} requests.`
          }
          action={
            auth.role === 'Employer' ? (
              <Link className="button button-outline" to="/artisanpage">
                Explore artisans
              </Link>
            ) : (
              <button className="button button-outline" onClick={() => setFilter('All')}>
                View all requests
              </button>
            )
          }
        />
      ) : (
        <div className="booking-list">
          {rows.map((booking) => (
            <article key={booking._id} className="booking-card">
              <div className="booking-top">
                <div>
                  <p className="eyebrow">
                    {auth.role === 'Artisan' ? booking.employer.fullname : booking.artisan.fullname}
                  </p>
                  <h3>{booking.serviceTitle}</h3>
                </div>
                <StatusBadge status={booking.status} label={labels[booking.status]} />
              </div>
              <div className="booking-meta">
                <span>
                  <CalendarDays size={16} />
                  {new Date(`${booking.date}T12:00:00`).toLocaleDateString('en-NG', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                  · preferred
                </span>
                <span>
                  <MapPin size={16} />
                  {booking.location}
                </span>
              </div>
              <details>
                <summary>View project details</summary>
                <p>{booking.serviceDescription}</p>
                <dl className="review-details">
                  <div>
                    <dt>Phone</dt>
                    <dd>{booking.phoneNumber}</dd>
                  </div>
                  <div>
                    <dt>Reference</dt>
                    <dd>{booking._id}</dd>
                  </div>
                </dl>
              </details>
              <div className="booking-bottom">
                <p>
                  {booking.status === 'Pending'
                    ? 'Waiting for an artisan response.'
                    : booking.status === 'Confirmed'
                      ? 'Request accepted. Scope and price still need to be agreed.'
                      : 'The artisan could not take this request.'}
                </p>
                {auth.role === 'Artisan' && booking.status === 'Pending' ? (
                  <div className="inline-actions">
                    <button
                      className="button button-small"
                      onClick={() => respond(booking._id, 'Confirmed')}
                      disabled={Boolean(busy)}
                    >
                      {busy === booking._id ? 'Updating…' : 'Confirm request'}
                    </button>
                    <button
                      className="button button-outline button-small"
                      onClick={() => respond(booking._id, 'Rejected')}
                      disabled={Boolean(busy)}
                    >
                      Decline
                    </button>
                  </div>
                ) : (
                  auth.role === 'Employer' && (
                    <Link className="text-link small-link" to={`/userprofile/${booking.artisanId}`}>
                      View artisan <ArrowUpRight size={15} />
                    </Link>
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
