import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { isDemo } from '../../services';
export default function Security() {
  return (
    <div className="panel security-panel">
      <ShieldCheck size={36} />
      <h2>Account security</h2>
      <p>
        {isDemo
          ? 'Demo accounts are role previews, not secure authentication. Every account uses Demo123!. Passwords are never stored or changed in the demo.'
          : 'Password changes and account recovery need a secure backend implementation.'}
      </p>
      <p>
        Browser records stay on this device until you reset the demo or clear site storage. Sign out
        before leaving a shared device. Use sample data, especially in addresses and uploads.
      </p>
      <Link to="/forget" className="button button-outline">
        {isDemo ? 'Preview account recovery' : 'Request account recovery'}
      </Link>
      <Link to="/demo" className="text-link">
        Service information and reset options
      </Link>
    </div>
  );
}
