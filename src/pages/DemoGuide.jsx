import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { services, isDemo } from '../services';
import { demoAccounts, DEMO_PASSWORD, dashboardFor } from '../data/catalog';
import PageHero from '../components/shared/PageHero';
import Modal from '../components/shared/Modal';
export default function DemoGuide() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [resetOpen, setResetOpen] = useState(false);
  async function explore(account) {
    setBusy(true);
    setError('');
    try {
      const session = await services.login({
        identifier: account.email,
        password: DEMO_PASSWORD,
      });
      navigate(dashboardFor(session.role));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  async function reset() {
    setBusy(true);
    setError('');
    try {
      await services.resetDemo();
      setResetOpen(false);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageHero
        kicker="SERVICE INFORMATION"
        title={
          <>
            Your workspace.
            <br />
            <em>Clearly explained.</em>
          </>
        }
        description="See which actions are available, how sample records are stored and where live services are currently unavailable."
      />
      <section className="container-app demo-guide">
        <div className="demo-guide-grid">
          {demoAccounts.map((account) => (
            <article className="panel" key={account.role}>
              <p className="eyebrow">
                {account.role === 'Employer' ? 'CLIENT / EMPLOYER' : account.role}
              </p>
              <h3>{account.label}</h3>
              <p>
                {account.role === 'Employer'
                  ? 'Find an artisan, send a sample project request and follow the response.'
                  : account.role === 'Artisan'
                    ? 'Respond to requests, edit your profile and add a few work photos.'
                    : 'Review pending profiles, explain declines and handle sample reports.'}
              </p>
              <div className="demo-account-info">
                {account.email}
                <br />
                Password: <strong>{DEMO_PASSWORD}</strong>
              </div>
              <button
                className="button"
                disabled={busy || !isDemo}
                onClick={() => explore(account)}
              >
                {busy
                  ? 'Opening…'
                  : `Explore as ${account.role === 'Employer' ? 'a client' : `an ${account.role.toLowerCase()}`}`}
              </button>
            </article>
          ))}
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <article className="panel">
          <h2>Explore with sample accounts</h2>
          <ol className="limit-list">
            <li>
              Open the client account, browse Carpentry and request Adewale for a sample project.
            </li>
            <li>Open the artisan account and confirm or decline that request.</li>
            <li>
              Return to the client account to see the updated response. Nothing has been sent
              outside this browser.
            </li>
            <li>
              To try verification, create a new artisan account, upload a sample image, then switch
              to Admin to review it.
            </li>
          </ol>
        </article>
        <article className="panel">
          <h2>What stays in your browser</h2>
          <p>
            Profiles, requests, verification decisions, reports, plan selections and sample messages
            use localStorage. They survive a refresh, signing out and closing the browser on this
            device. Signing out ends the session and keeps your demo data.
          </p>
          <p>
            Data is specific to this site’s address and browser. It does not sync to other devices.
            Private browsing, clearing site data or changing the local port can remove it. Use one
            tab for role switching; concurrent tabs are not coordinated.
          </p>
          <p>
            Photos are stored as small data URLs. Each JPEG, PNG or WebP must be under 1 MB; the
            work gallery allows four photos. Your browser’s total storage limit can be reached
            sooner. A save failure keeps the previous saved data and lets you retry.
          </p>
          <p>
            Demo authentication is not secure. Use fictional contact details, sample addresses and
            non-sensitive uploads. All demo accounts use Demo123!, and no password is stored.
          </p>
        </article>
        <article className="panel">
          <h2>Live services currently unavailable</h2>
          <ul className="limit-list">
            <li>Secure login, account ownership, role permissions and password recovery.</li>
            <li>Email verification, notifications, real messaging and appointment coordination.</li>
            <li>Identity, skill and background checks, plus moderation and audit records.</li>
            <li>
              Payments, receipts, refunds, recurring subscriptions and genuine visibility upgrades.
            </li>
            <li>
              Durable file storage, PDF documents, shared data and reliable cross-device access.
            </li>
          </ul>
        </article>
        {isDemo && (
          <article className="panel">
            <h2>Ready for a fresh start?</h2>
            <p>
              Reset removes all local demo changes and signs you out. The sample profiles and
              requests return. Downloaded files and real services are unaffected.
            </p>
            <button
              className="button button-outline"
              onClick={() => {
                setError('');
                setResetOpen(true);
              }}
            >
              Reset sample data
            </button>
          </article>
        )}
        <Modal
          open={resetOpen}
          onClose={() => setResetOpen(false)}
          title="Reset your sample data?"
          description="Your locally created accounts, edits, requests and uploads will be cleared. Sample data will be restored."
          busy={busy}
        >
          <div className="form-actions">
            <button
              className="button button-outline"
              disabled={busy}
              onClick={() => setResetOpen(false)}
            >
              Keep my data
            </button>
            <button className="button button-danger" disabled={busy} onClick={reset}>
              {busy ? 'Resetting…' : 'Reset sample data'}
            </button>
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
        </Modal>
      </section>
    </>
  );
}
