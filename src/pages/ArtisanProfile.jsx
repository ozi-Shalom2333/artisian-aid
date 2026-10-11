import { useCallback, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  MapPin,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  BadgeCheck,
  CalendarDays,
} from 'lucide-react';
import { services, isDemo } from '../services';
import useResource from '../hooks/useResource';
import useAuth from '../hooks/useAuth';
import { categories } from '../data/catalog';
import Avatar from '../components/shared/Avatar';
import Modal from '../components/shared/Modal';
import Field from '../components/shared/Field';
import ServiceIcon from '../components/shared/ServiceIcon';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/shared/ErrorState';
export default function ArtisanProfile() {
  const { userId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const loader = useCallback(() => services.getArtisan(userId), [userId]);
  const resource = useResource(loader);
  const [bookingOpen, setBookingOpen] = useState(
    params.get('request') === '1' && auth.role === 'Employer',
  );
  const [reportOpen, setReportOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    serviceTitle: '',
    serviceDescription: '',
    location: '',
    phoneNumber: auth.user?.phoneNumber || '',
    date: '',
  });
  const [reason, setReason] = useState('');
  const [reportDone, setReportDone] = useState(false);
  const [created, setCreated] = useState(null);
  function setField(e) {
    setForm((value) => ({ ...value, [e.target.name]: e.target.value }));
    setError('');
  }
  function openBooking() {
    if (auth.role !== 'Employer') {
      navigate(`/login?next=${encodeURIComponent(`/userprofile/${userId}?request=1`)}`);
      return;
    }
    setError('');
    setStep(1);
    setCreated(null);
    setBookingOpen(true);
  }
  async function submitBooking(e) {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    setBusy(true);
    setError('');
    try {
      const booking = await services.createBooking(userId, form);
      setCreated(booking);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  async function report(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await services.createReport(userId, reason);
      setReportDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  if (resource.loading) return <LoadingSpinner message="Getting to know this artisan…" />;
  if (resource.error)
    return (
      <div className="container-app page-section">
        <ErrorState
          title="This profile is unavailable"
          description={resource.error}
          onRetry={resource.reload}
        />
        <Link className="text-link" to="/artisanpage">
          Explore other artisans
        </Link>
      </div>
    );
  const user = resource.data;
  const category = categories.find((c) => c.name === user.category);
  const illustrativeCover = !user.coverPhoto?.image_url || user.coverPhoto.illustrative;
  return (
    <section className="container-app profile-page">
      <Link className="back-link" to="/artisanpage">
        <ArrowLeft size={16} />
        Back to artisans
      </Link>
      <div className="profile-layout">
        <div className="profile-main">
          <div className="profile-cover">
            <img
              src={user.coverPhoto?.image_url || '/media/workshop.webp'}
              alt={
                illustrativeCover
                  ? 'Illustrative craft photograph'
                  : `${user.businessName} cover photo`
              }
            />
            <span>{illustrativeCover ? 'Illustrative photography' : 'Profile cover'}</span>
          </div>
          <div className="profile-identity">
            <Avatar large name={user.fullname} image={user.profilePic?.image_url} />
            <div>
              <p className="eyebrow">{category?.label || user.category}</p>
              <h1>{user.fullname}</h1>
              <p>{user.businessName}</p>
            </div>
            <BadgeCheck
              className="review-icon"
              size={26}
              aria-label={isDemo ? 'Profile reviewed in demo' : 'Profile reviewed'}
            />
          </div>
          <div className="profile-meta">
            <span>
              <MapPin size={16} />
              {user.location?.lga}, Lagos
            </span>
            <span className={user.availability ? 'available' : 'unavailable'}>
              {user.availability ? 'Open to new requests' : 'Not accepting requests'}
            </span>
            {isDemo && <span>Fictional demo profile</span>}
          </div>
          <section className="profile-section">
            <h2>The person behind the craft</h2>
            <p>{user.bio || 'This artisan has not added a bio yet.'}</p>
            {user.socialMediaLink?.startsWith('https://') && (
              <a className="text-link" href={user.socialMediaLink} target="_blank" rel="noreferrer">
                Visit their social profile <ArrowUpRight size={16} />
              </a>
            )}
          </section>
          <section className="profile-section">
            <div className="section-heading compact">
              <h2>A closer look at the work</h2>
              <span>{user.portfolio?.length || 0} photos</span>
            </div>
            {user.portfolio?.length ? (
              <div className="portfolio-grid">
                {user.portfolio.map((work) => (
                  <figure key={work._id}>
                    <img src={work.image_url} alt={work.title} />
                    <figcaption>
                      {work.title}
                      {work.illustrative ? ' · illustrative' : ''}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <p className="quiet-empty">
                This artisan is still putting their work gallery together.
              </p>
            )}
          </section>
        </div>
        <aside className="profile-request">
          <span className="request-icon">
            <ServiceIcon name={category?.icon} size={28} />
          </span>
          <p className="eyebrow">LET’S START A CONVERSATION</p>
          <h2>
            Have a project
            <br />
            in mind?
          </h2>
          <p>
            Share the details with {user.fullname.split(' ')[0]}. A request is the first step, so
            you can agree the scope, timing and price.
          </p>
          <ul className="request-notes">
            <li>
              <CalendarDays size={17} />
              Choose a preferred date
            </li>
            <li>
              <CheckCircle2 size={17} />
              Track the response in your dashboard
            </li>
          </ul>
          <button className="button" onClick={openBooking} disabled={!user.availability}>
            Request this artisan <ArrowUpRight size={18} />
          </button>
          <small>
            {isDemo
              ? 'Demo only. No one is contacted and no job is scheduled.'
              : 'A request is not a confirmed appointment.'}
          </small>
          <button
            className="subtle-button"
            onClick={() => {
              if (auth.role !== 'Employer') {
                navigate(`/login?next=${encodeURIComponent(`/userprofile/${userId}`)}`);
                return;
              }
              setError('');
              setReportDone(false);
              setReportOpen(true);
            }}
          >
            Report a concern
          </button>
        </aside>
      </div>
      <Modal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        busy={busy}
        title={
          created
            ? isDemo
              ? 'Your demo request is saved'
              : 'Your request is saved'
            : step === 1
              ? `A little detail goes a long way`
              : 'Review your request'
        }
        description={
          created
            ? isDemo
              ? 'No email was sent and no real appointment was made.'
              : 'Your request is awaiting the artisan’s response.'
            : `Requesting ${user.fullname} · ${isDemo ? 'frontend demo' : 'booking request'}`
        }
      >
        {created ? (
          <div className="success-panel">
            <CheckCircle2 size={42} />
            <h3>Next step: an artisan response</h3>
            <p>
              Find “{created.serviceTitle}” under My requests. In the demo, switch to the artisan
              account to respond.
            </p>
            <Link className="button" to="/employerdashboard?tab=requests">
              View my requests <ArrowUpRight size={18} />
            </Link>
            <button className="subtle-button" onClick={() => setBookingOpen(false)}>
              Keep exploring
            </button>
          </div>
        ) : (
          <form onSubmit={submitBooking} className="form-stack">
            {step === 1 ? (
              <>
                <Field
                  label="Project title"
                  name="serviceTitle"
                  value={form.serviceTitle}
                  onChange={setField}
                  placeholder="e.g. A wardrobe for the main bedroom"
                  minLength={3}
                  maxLength={100}
                  required
                />
                <Field
                  label="Tell us what needs doing"
                  name="serviceDescription"
                  value={form.serviceDescription}
                  onChange={setField}
                  multiline
                  minLength={10}
                  maxLength={1500}
                  required
                  placeholder="What would you like made, fixed or improved?"
                />
                <div className="form-grid">
                  <Field
                    label="Preferred date"
                    type="date"
                    name="date"
                    min={new Date().toISOString().slice(0, 10)}
                    value={form.date}
                    onChange={setField}
                    hint="Subject to the artisan’s response."
                    required
                  />
                  <Field
                    label="Phone number"
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={setField}
                    pattern="(?:\+234|0)[789][01]\d{8}"
                    placeholder="08012345678"
                    required
                  />
                </div>
                <Field
                  label="Project address"
                  name="location"
                  value={form.location}
                  onChange={setField}
                  minLength={5}
                  maxLength={200}
                  hint={isDemo ? 'Use a sample address for this demo.' : undefined}
                  required
                />
              </>
            ) : (
              <>
                <dl className="review-details">
                  <div>
                    <dt>Project</dt>
                    <dd>{form.serviceTitle}</dd>
                  </div>
                  <div>
                    <dt>Details</dt>
                    <dd>{form.serviceDescription}</dd>
                  </div>
                  <div>
                    <dt>Preferred date</dt>
                    <dd>{form.date}</dd>
                  </div>
                  <div>
                    <dt>Address</dt>
                    <dd>{form.location}</dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>{form.phoneNumber}</dd>
                  </div>
                </dl>
                <p className="info-note">
                  {isDemo
                    ? 'This saves a local demo request. It does not book a real professional.'
                    : 'Confirm the scope and price with the artisan before work begins.'}
                </p>
              </>
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="form-actions">
              {step === 2 && (
                <button
                  type="button"
                  className="button button-outline"
                  disabled={busy}
                  onClick={() => setStep(1)}
                >
                  Edit details
                </button>
              )}
              <button className="button" disabled={busy}>
                {busy
                  ? 'Saving request…'
                  : step === 1
                    ? 'Review request'
                    : isDemo
                      ? 'Save demo request'
                      : 'Send request'}
                <ArrowUpRight size={17} />
              </button>
            </div>
          </form>
        )}
      </Modal>
      <Modal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        busy={busy}
        title={
          reportDone
            ? isDemo
              ? 'Your demo report is saved'
              : 'Your report is saved'
            : 'Report a concern'
        }
        description={
          isDemo
            ? 'A simulated moderation report. No real person or support team is notified.'
            : 'Describe the issue so the moderation team can review it.'
        }
      >
        {reportDone ? (
          <div className="success-panel">
            <CheckCircle2 size={36} />
            <p>The report is now in the admin review queue.</p>
            <button className="button" onClick={() => setReportOpen(false)}>
              Done
            </button>
          </div>
        ) : (
          <form className="form-stack" onSubmit={report}>
            <Field
              label="What happened?"
              multiline
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              minLength={10}
              maxLength={1500}
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="button" disabled={busy}>
              {busy ? 'Saving…' : isDemo ? 'Save demo report' : 'Submit report'}
            </button>
          </form>
        )}
      </Modal>
    </section>
  );
}
