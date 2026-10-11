import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <section className="container-app page-section">
      <p className="eyebrow">404 · A SMALL DETOUR</p>
      <h1 className="page-intro">
        Let’s get you back
        <br />
        <em>to the right place.</em>
      </h1>
      <p className="intro-description">
        That page isn’t available. The artisan community is a good place to start.
      </p>
      <Link className="button" to="/artisanpage">
        Find an artisan
      </Link>
    </section>
  );
}
