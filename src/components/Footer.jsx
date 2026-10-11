import { Link } from 'react-router-dom';
import Brand from './Brand';
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-app">
        <div className="footer-top">
          <div>
            <Brand light />
            <p>
              Good people. Great craft.
              <br />A little less on your to-do list.
            </p>
          </div>
          <div>
            <h2>Find your people</h2>
            <Link to="/artisanpage">Explore artisans</Link>
            <Link to="/category">Browse services</Link>
            <Link to="/employersignup">Create a client account</Link>
          </div>
          <div>
            <h2>Grow your craft</h2>
            <Link to="/signup">Become an artisan</Link>
            <Link to="/login">Sign in</Link>
          </div>
          <div>
            <h2>Artisan Aid</h2>
            <Link to="/about">Our story</Link>
            <Link to="/meetTeam">Team & contributors</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Artisan Aid</span>
          <Link to="/meetTeam">Built together by the Artisan Aid team.</Link>
          <Link to="/demo">Service information</Link>
        </div>
      </div>
    </footer>
  );
}
