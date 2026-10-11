import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Brand from '../Brand';
export default function AuthLayout({
  title,
  subtitle,
  children,
  wide = false,
  headline = (
    <>
      Good people.
      <br />
      Great craft.
      <br />
      <em>Better connections.</em>
    </>
  ),
}) {
  return (
    <main className="auth-layout" id="main-content" tabIndex={-1}>
      <aside className="auth-story">
        <Brand light />
        <div>
          <p className="eyebrow">A COMMUNITY BUILT BY HAND</p>
          <h2>{headline}</h2>
          <p>
            For the people who need a hand.
            <br />
            And the people who know how.
          </p>
          <Link to="/artisanpage">
            Explore the community <ArrowUpRight size={18} />
          </Link>
        </div>
        <img src="/media/carpentry.webp" alt="A craftsperson working in a wood workshop" />
      </aside>
      <div className="auth-content">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          Back to Artisan Aid
        </Link>
        <div className={`auth-form ${wide ? 'auth-form-wide' : ''}`}>
          <p className="eyebrow">ARTISAN AID</p>
          {title && <h1>{title}</h1>}
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
          {children}
        </div>
      </div>
    </main>
  );
}
