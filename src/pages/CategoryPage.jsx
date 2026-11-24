import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useServices } from '../services/context';
import useResource from '../hooks/useResource';
import PageHero from '../components/shared/PageHero';
import ServiceIcon from '../components/shared/ServiceIcon';
import EmptyState from '../components/shared/EmptyState';
import { Skeleton } from '../components/ui/skeleton';
import Reveal from '../components/motion/Reveal';
export default function CategoryPage() {
  const { services } = useServices();
  const resource = useResource(services.listCategories);
  const items = resource.data || [];
  return (
    <>
      <PageHero
        kicker="THE EVERYDAY, TAKEN CARE OF"
        title={
          <>
            A little help.
            <br />
            <em>A lot of possibility.</em>
          </>
        }
        description="Start with what needs doing. Find the people who know how."
      />
      <section className="container-app page-section">
        {resource.loading ? (
          <div className="category-page-grid" role="status" aria-label="Loading categories">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="category-page-card">
                <Skeleton className="my-4 size-11 rounded-md" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="my-3 h-4 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : !items.length ? (
          <EmptyState
            title="No service categories available"
            description="Service categories will appear here once published."
          />
        ) : (
          <Reveal as="div" className="category-page-grid">
            {items.map((category, index) => (
              <Link
                key={category.name}
                to={`/category/${encodeURIComponent(category.name)}`}
                className="category-page-card"
              >
                <span className="category-number">0{index + 1}</span>
                <ServiceIcon name={category.icon} size={44} />
                <h2>{category.label || category.name}</h2>
                <p>{category.description}</p>
                <span className="text-link">
                  Explore artisans <ArrowUpRight size={18} />
                </span>
              </Link>
            ))}
          </Reveal>
        )}
      </section>
    </>
  );
}
