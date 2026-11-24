import { useCallback, useState } from 'react';
import { Check, CheckCircle2 } from 'lucide-react';
import { useServices } from '../../services/context';
import useResource from '../../hooks/useResource';
import Modal from '../../components/shared/Modal';
import EmptyState from '../../components/shared/EmptyState';
import ErrorState from '../../components/shared/ErrorState';
import { Skeleton } from '../../components/ui/skeleton';
export default function Plans() {
  const { services } = useServices();
  const load = useCallback(
    () => Promise.all([services.listPlans(), services.getProfile()]),
    [services],
  );
  const resource = useResource(load);
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  async function choose() {
    setBusy(true);
    setError('');
    setSuccess('');
    try {
      await services.choosePlan(selected._id);
      setSuccess(`${selected.planName} plan selected.`);
      setSelected(null);
      resource.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  if (resource.loading)
    return (
      <div className="plans-grid" role="status" aria-label="Loading plans">
        {[1, 2].map((n) => (
          <div key={n} className="plan-card space-y-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-4 w-48" />
            <div className="space-y-2 py-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-4 w-36" />
            </div>
            <Skeleton className="h-11 w-40" />
          </div>
        ))}
      </div>
    );
  if (resource.error) return <ErrorState description={resource.error} onRetry={resource.reload} />;
  const [plans, user] = resource.data;
  if (!plans.length)
    return (
      <EmptyState
        title="No subscription plans available"
        description="Plans will appear here once published."
      />
    );
  return (
    <div>
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
              disabled={user.subscription === plan._id}
              onClick={() => {
                setSelected(plan);
                setError('');
              }}
            >
              {user.subscription === plan._id ? 'Current plan' : 'Select plan'}
            </button>
          </article>
        ))}
      </div>
      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title="Select subscription plan"
        description="Confirm your subscription plan selection."
        busy={busy}
      >
        <div className="success-panel">
          <CheckCircle2 size={34} />
          <p>Select the {selected?.planName} plan for your account.</p>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button" onClick={choose} disabled={busy}>
            {busy ? 'Saving…' : 'Confirm plan'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
