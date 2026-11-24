import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
export default function Security() {
  return (
    <div className="panel security-panel">
      <ShieldCheck size={36} />
      <h2>Account security</h2>
      <p>Keep your password private and sign out before leaving a shared device.</p>
      <Link to="/forget" className="button button-outline">
        Request account recovery
      </Link>
    </div>
  );
}
