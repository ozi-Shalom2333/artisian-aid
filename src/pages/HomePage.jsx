import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import HeroSection from '../features/home/HeroSection';
import CategoriesSection from '../features/home/CategoriesSection';
import FeaturesSection from '../features/home/FeaturesSection';
import Card from '../components/Card';
import useResource from '../hooks/useResource';
import { services, isDemo } from '../services';
import ErrorState from '../components/shared/ErrorState';
import EmptyState from '../components/shared/EmptyState';
export default function HomePage() {
  const resource = useResource(services.listArtisans);
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <section className="container-app featured-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PEOPLE WHO KNOW THEIR CRAFT</p>
            <h2>
              Your next project.
              <br />
              <em>Their everyday expertise.</em>
            </h2>
          </div>
          <Link to="/artisanpage" className="text-link">
            Meet the artisans <ArrowUpRight size={18} />
          </Link>
        </div>
        {resource.loading ? (
          <div className="cards-grid" role="status" aria-label="Loading artisans">
            {[1, 2, 3].map((n) => (
              <div key={n} className="card-skeleton" />
            ))}
          </div>
        ) : resource.error ? (
          <ErrorState description={resource.error} onRetry={resource.reload} />
        ) : resource.data?.length ? (
          <div className="cards-grid">
            {resource.data.slice(0, 3).map((artisan) => (
              <Card key={artisan._id} data={artisan} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="The community is just getting started"
            description="New artisan profiles will appear here."
          />
        )}
        {isDemo && (
          <p className="sample-note bottom-note">
            Sample profiles are shown while live service access is unavailable.
          </p>
        )}
      </section>
      <FeaturesSection />
      <section className="container-app artisan-callout">
        <img
          src="/media/carpentry.webp"
          alt="A craftsperson carefully working with wood"
          loading="lazy"
        />
        <div>
          <p className="eyebrow">FOR THE HANDS THAT MAKE IT HAPPEN</p>
          <h2>
            You bring the skill.
            <br />
            <em>Let’s make the connection.</em>
          </h2>
          <p>Create a profile, share your work and give your next client a way to find you.</p>
          <Link className="button button-amber" to="/signup">
            Join as an artisan <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
