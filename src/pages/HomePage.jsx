import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import HeroSection from '../features/home/HeroSection';
import CategoriesSection from '../features/home/CategoriesSection';
import FeaturesSection from '../features/home/FeaturesSection';
import Card from '../components/Card';
import useResource from '../hooks/useResource';
import { useServices } from '../services/context';
import ErrorState from '../components/shared/ErrorState';
import EmptyState from '../components/shared/EmptyState';
import { Skeleton } from '../components/ui/skeleton';
import Reveal from '../components/motion/Reveal';
export default function HomePage() {
  const { services } = useServices();
  const resource = useResource(services.listArtisans);
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <section className="container-app featured-section">
        <Reveal className="section-heading">
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
        </Reveal>
        {resource.loading ? (
          <div className="cards-grid" role="status" aria-label="Loading artisans">
            {[1, 2, 3].map((n) => (
              <div key={n} className="artisan-card">
                <Skeleton className="h-[214px] w-full rounded-none" />
                <div className="artisan-card-body">
                  <div className="artisan-person">
                    <Skeleton className="size-9 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <div className="artisan-card-meta">
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : resource.error ? (
          <ErrorState
            quiet
            title="Profiles are temporarily unavailable"
            description={resource.error}
            onRetry={resource.reload}
          />
        ) : resource.data?.length ? (
          <Reveal className="cards-grid">
            {resource.data.slice(0, 3).map((artisan) => (
              <Card key={artisan._id} data={artisan} />
            ))}
          </Reveal>
        ) : (
          <EmptyState
            title="The community is just getting started"
            description="New artisan profiles will appear here."
          />
        )}
      </section>
      <FeaturesSection />
      <Reveal as="section" className="container-app artisan-callout">
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
      </Reveal>
    </>
  );
}
