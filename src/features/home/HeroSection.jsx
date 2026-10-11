import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowUpRight, MapPin, MoveUpRight } from 'lucide-react';
import { useState } from 'react';
import { locations } from '../../data/catalog';
export default function HeroSection() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  function search(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (location) params.set('area', location);
    navigate(`/artisanpage?${params}`);
  }
  return (
    <section className="home-hero container-app">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="little-line" /> LOCAL SKILL. EVERYDAY POSSIBILITY.
        </p>
        <h1>
          Good work starts
          <br />
          with the <br />
          <em>right hands.</em>
        </h1>
        <p className="hero-description">
          From the little fixes to the big ideas. Find skilled artisans in Lagos who can bring your
          project to life.
        </p>
        <form className="hero-search" onSubmit={search}>
          <div>
            <Search size={19} aria-hidden="true" />
            <label className="sr-only" htmlFor="hero-query">
              What do you need help with?
            </label>
            <input
              id="hero-query"
              placeholder="What needs doing?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="hero-location">
            <MapPin size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="hero-area">
              Your area
            </label>
            <select id="hero-area" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">All Lagos</option>
              {locations.map((area) => (
                <option key={area}>{area}</option>
              ))}
            </select>
          </div>
          <button className="button" type="submit">
            Find an artisan <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </form>
        <div className="popular-links">
          <span>Popular:</span>
          {['Carpentry', 'Plumbing', 'Cleaning'].map((word) => (
            <Link key={word} to={`/artisanpage?q=${word}`}>
              {word}
            </Link>
          ))}
        </div>
        <div className="hero-note">
          <span className="note-icon">
            <MoveUpRight size={22} aria-hidden="true" />
          </span>
          <p>
            <strong>Skills deserve to be seen.</strong>
            <br />A community for the people who make things happen.
          </p>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-image-wrap">
          <img
            src="/media/hero.webp"
            alt="A smiling craftsperson holding a power tool in a wood workshop"
            fetchPriority="high"
            width="950"
            height="1100"
          />
          <span className="vertical-caption">THE PEOPLE BEHIND THE POSSIBILITIES</span>
          <div className="hero-image-label">
            <span className="amber-dot" />
            <span>
              Crafted with care.
              <br />
              <strong>Connected through Artisan Aid.</strong>
            </span>
          </div>
        </div>
        <span className="craft-stamp" aria-hidden="true">
          GOOD
          <br />
          <em>hands</em>
          <span>GREAT CRAFT</span>
        </span>
        <span className="hero-image-credit">
          Illustrative photography from the original project
        </span>
      </div>
    </section>
  );
}
