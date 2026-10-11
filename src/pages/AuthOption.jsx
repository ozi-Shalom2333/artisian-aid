import { Link } from 'react-router-dom';
import { ArrowUpRight, Hammer, Search } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
export default function AuthOption() {
  return (
    <AuthLayout
      title="There’s a place for you here."
      subtitle="How would you like to use Artisan Aid?"
    >
      <div className="role-options">
        <Link to="/employersignup">
          <Search />
          <h2>I need a hand</h2>
          <p>Find artisans and track requests for your home or business.</p>
          <span className="text-link">
            Join as a client <ArrowUpRight size={18} />
          </span>
        </Link>
        <Link to="/signup">
          <Hammer />
          <h2>I know my craft</h2>
          <p>Share your skills, show your work and manage new requests.</p>
          <span className="text-link">
            Join as an artisan <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>
    </AuthLayout>
  );
}
