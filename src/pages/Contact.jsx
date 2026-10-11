import { useState } from 'react';
import { services, isDemo } from '../services';
import PageHero from '../components/shared/PageHero';
import Field from '../components/shared/Field';
import { CheckCircle2 } from 'lucide-react';
export default function Contact() {
  const [form, setForm] = useState({ fullname: '', email: '', message: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const change = (e) => setForm((v) => ({ ...v, [e.target.name]: e.target.value }));
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const result = await services.sendContact(form);
      setReference(result.reference);
      setForm({ fullname: '', email: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageHero
        kicker="LET’S TALK"
        title={
          <>
            Every good connection
            <br />
            <em>starts somewhere.</em>
          </>
        }
        description="Questions, ideas or something we could do better? There’s room for your feedback."
      />
      <section className="container-app contact-layout">
        <div>
          <h2>A note can go a long way.</h2>
          <p>
            Share an idea for Artisan Aid or tell us what was unclear as you explored the project.
          </p>
          {isDemo && (
            <p className="info-note">
              The demo form saves a sample message in this browser. It does not deliver it to the
              team. For direct contact, the original project listed this email address.
            </p>
          )}
          <div className="contact-detail">
            <strong>Original project email</strong>
            <a href="mailto:artisanaid.team@gmail.com">artisanaid.team@gmail.com</a>
          </div>
          <p className="sample-note bottom-note">
            Opening the email link uses your email app. It is separate from the simulated form.
          </p>
        </div>
        <div className="panel">
          {reference ? (
            <div className="success-panel" role="status">
              <CheckCircle2 size={40} />
              <h2>{isDemo ? 'Your demo message is saved.' : 'Your message has been received.'}</h2>
              <p>
                {isDemo
                  ? 'No email or support ticket was sent. This is a local preview of the contact workflow.'
                  : 'Keep your reference for any follow-up.'}
              </p>
              <p className="sample-note">Reference: {reference}</p>
              <button className="button" onClick={() => setReference('')}>
                Write another message
              </button>
            </div>
          ) : (
            <form className="form-stack" onSubmit={submit}>
              <Field
                label="Full name"
                name="fullname"
                value={form.fullname}
                onChange={change}
                required
                minLength={2}
                maxLength={80}
                autoComplete="name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={change}
                required
                autoComplete="email"
              />
              <Field
                label="Your message"
                name="message"
                multiline
                value={form.message}
                onChange={change}
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
                {busy ? 'Saving…' : isDemo ? 'Save demo message' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
