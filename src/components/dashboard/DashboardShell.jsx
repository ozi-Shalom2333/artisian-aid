import { Link, useNavigate } from 'react-router-dom';
import { LogOut, ArrowUpRight, ChevronDown } from 'lucide-react';
import Brand from '../Brand';
import Avatar from '../shared/Avatar';
import useAuth from '../../hooks/useAuth';
export default function DashboardShell({
  navSections = [],
  activeKey,
  headerTitle,
  headerSubtitle,
  children,
}) {
  const auth = useAuth();
  const navigate = useNavigate();
  const nav = (
    <nav aria-label="Dashboard navigation">
      {navSections.map((section) => (
        <div className="dash-nav-group" key={section.label}>
          <p>{section.label}</p>
          {section.items.map(({ key, to, label, icon: Icon }) => (
            <Link
              key={key}
              to={to}
              className={activeKey === key ? 'active' : ''}
              aria-current={activeKey === key ? 'page' : undefined}
              onClick={(e) => {
                e.currentTarget.closest('details')?.removeAttribute('open');
              }}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
  async function logout() {
    await auth.logout();
    navigate('/login', { replace: true });
  }
  return (
    <div className="dashboard-layout">
      <aside className="dash-sidebar">
        <Brand />
        <div className="workspace-label">
          <span />
          {auth.role === 'Employer' ? 'Client workspace' : `${auth.role} workspace`}
        </div>
        {nav}
        <div className="dash-sidebar-bottom">
          <Link to="/artisanpage">
            <ArrowUpRight size={17} />
            Explore artisans
          </Link>
          <Link to="/demo">Service information & reset</Link>
          <button onClick={logout}>
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dash-header">
          <Link to="/" className="dash-home">
            Artisan Aid / {auth.role === 'Employer' ? 'Client' : auth.role}
          </Link>
          <div className="dash-user">
            <span>{auth.user?.fullname}</span>
            <Avatar name={auth.user?.fullname} image={auth.user?.profilePic?.image_url} />
          </div>
        </header>
        <details className="mobile-dash-nav">
          <summary>
            Dashboard menu <ChevronDown size={17} />
          </summary>
          {nav}
          <Link to="/artisanpage">Explore artisans</Link>
          <Link to="/demo">Service information & reset</Link>
          <button className="subtle-button" onClick={logout}>
            Sign out
          </button>
        </details>
        <main id="main-content" tabIndex={-1} className="dash-content">
          <div className="dash-page-heading">
            <p className="eyebrow">YOUR ARTISAN AID WORKSPACE</p>
            <h1>{headerTitle}</h1>
            <p>{headerSubtitle}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
