import { useState } from 'react';
import { useServices } from '../services/context';
import PageHero from '../components/shared/PageHero';
import Field from '../components/shared/Field';
import { CheckCircle2 } from 'lucide-react';
export default function Contact() {
  const { services } = useServices();
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
          <p>Share an idea for Artisan Aid or tell us how we can help.</p>
          <div className="contact-detail">
            <strong>Email our team</strong>
            <a href="mailto:artisanaid.team@gmail.com">artisanaid.team@gmail.com</a>
          </div>
          <p className="sample-note bottom-note">Prefer email? Write directly to our team.</p>
        </div>
        <div className="panel">
          {reference ? (
            <div className="success-panel" role="status">
              <CheckCircle2 size={40} />
              <h2>Your message has been received.</h2>
              <p>Keep your reference for any follow-up.</p>
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
                {busy ? 'Saving…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
