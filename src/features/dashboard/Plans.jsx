import { useState } from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { services, isDemo } from '../../services';
import useResource from '../../hooks/useResource';
import Modal from '../../components/shared/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/shared/ErrorState';
const load = () => Promise.all([services.listPlans(), services.getProfile()]);
export default function Plans() {
  const resource = useResource(load);
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  async function choose() {
    setBusy(true);
    setError('');
    try {
      await services.choosePlan(selected._id);
      setSuccess(`Demo ${selected.planName} plan selected. No payment was taken.`);
      setSelected(null);
      resource.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  if (resource.loading) return <LoadingSpinner message="Loading plan previews…" />;
  if (resource.error) return <ErrorState description={resource.error} onRetry={resource.reload} />;
  const [plans, user] = resource.data;
  return (
    <div>
      <p className="info-note">
        These are illustrative plans from the original project. Real subscriptions, payment
        processing, receipts and visibility upgrades need a backend. No card details are requested.
      </p>
      {success && (
        <p className="success-note" role="status">
          {success}
        </p>
      )}
      <div className="plans-grid">
        {plans.map((plan) => (
          <article
            className={`plan-card ${plan._id === 'plan-premium' ? 'plan-premium' : ''}`}
            key={plan._id}
          >
            <p className="eyebrow">{plan.planName}</p>
            <h2>
              ₦{plan.amount.toLocaleString()}
              <span> / {plan.duration}</span>
            </h2>
            <p>{plan.description}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={17} />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="button"
              disabled={!isDemo || user.subscription === plan._id}
              onClick={() => {
                setSelected(plan);
                setError('');
              }}
            >
              {user.subscription === plan._id
                ? 'Selected in demo'
                : isDemo
                  ? 'Preview this plan'
                  : 'Checkout unavailable'}
            </button>
          </article>
        ))}
      </div>
      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title="Preview a subscription"
        description="This simulates a plan selection. You will not be charged and there is no recurring subscription."
        busy={busy}
      >
        <div className="success-panel">
          <CheckCircle2 size={34} />
          <p>Select the {selected?.planName} plan for this browser demo.</p>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button" onClick={choose} disabled={busy}>
            {busy ? 'Saving…' : 'Simulate plan selection'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
