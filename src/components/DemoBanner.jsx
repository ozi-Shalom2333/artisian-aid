import { FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSyncExternalStore } from 'react';
import { isDemo, services, subscribe } from '../services';
export default function DemoBanner() {
  const warning = useSyncExternalStore(subscribe, services.getStorageWarning);
  if (!isDemo) return null;
  return (
    <>
      <div className="demo-banner">
        <div className="container-app">
          <span>
            <FlaskConical size={14} aria-hidden="true" />
            <strong>Portfolio demo</strong>
            <span className="demo-detail"> Fictional profiles. No real bookings or payments.</span>
          </span>
          <Link to="/demo">
            Explore the demo <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      {warning && (
        <p className="storage-warning" role="status">
          {warning}
        </p>
      )}
    </>
  );
}
