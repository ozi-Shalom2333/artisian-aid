import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, ArrowUpRight } from 'lucide-react';
import Brand from './Brand';
import Modal from './shared/Modal';
import useAuth from '../hooks/useAuth';
import { dashboardFor } from '../data/catalog';
const navItems = [
  { to: '/artisanpage', label: 'Find an artisan' },
  { to: '/about', label: 'Our story' },
  { to: '/contact', label: 'Contact' },
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const { pathname } = useLocation();
  const links = (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            isActive || (item.to === '/artisanpage' && pathname.startsWith('/category'))
              ? 'active'
              : ''
          }
        >
          {item.label}
        </NavLink>
      ))}
    </>
  );
  return (
    <header className="site-header">
      <div className="container-app header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links}
        </nav>
        <div className="desktop-actions">
          {auth.isAuthenticated ? (
            <Link className="button button-small" to={dashboardFor(auth.role)}>
              My dashboard <ArrowUpRight size={16} />
            </Link>
          ) : (
            <>
              <Link className="text-link" to="/login">
                Sign in
              </Link>
              <Link className="button button-small" to="/signup">
                Join as an artisan <ArrowUpRight size={16} />
              </Link>
            </>
          )}
        </div>
        <button
          className="icon-button mobile-menu-button"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Explore Artisan Aid"
          description="Find a professional or manage your account."
        >
          <nav className="mobile-links" aria-label="Mobile navigation">
            {links}
            {auth.isAuthenticated ? (
              <Link to={dashboardFor(auth.role)} onClick={() => setOpen(false)}>
                My dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  Join as an artisan
                </Link>
              </>
            )}
          </nav>
        </Modal>
      </div>
    </header>
  );
}
