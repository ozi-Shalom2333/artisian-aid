import { Link } from 'react-router-dom';
export default function Brand({ light = false }) {
  return (
    <Link to="/" aria-label="Artisan Aid home" className={`brand ${light ? 'brand-light' : ''}`}>
      <span className="brand-mark" aria-hidden="true">
        A<span />
      </span>
      <span>
        artisan<span className="brand-aid">aid</span>
        <span className="brand-period">.</span>
      </span>
    </Link>
  );
}
