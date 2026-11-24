import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useServices } from '../../services/context';
import useResource from '../../hooks/useResource';
import ServiceIcon from '../../components/shared/ServiceIcon';
import EmptyState from '../../components/shared/EmptyState';
import { Skeleton } from '../../components/ui/skeleton';
import Reveal from '../../components/motion/Reveal';
export default function CategoriesSection() {
  const { services } = useServices();
  const resource = useResource(services.listCategories);
  const items = resource.data || [];
  return (
    <section className="services-section">
      <div className="container-app">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">A HAND FOR EVERY TASK</p>
            <h2>What’s on your to-do list?</h2>
          </div>
          <Link className="text-link" to="/category">
            All services <ArrowUpRight size={18} />
          </Link>
        </Reveal>
        {resource.loading ? (
          <div className="service-grid" role="status" aria-label="Loading services">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="service-tile">
                <Skeleton className="size-7 rounded-md" />
                <Skeleton className="mt-4 h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : !items.length ? (
          <EmptyState
            title="No services listed yet"
            description="Service categories will appear here once configured."
          />
        ) : (
          <Reveal className="service-grid">
            {items.slice(0, 6).map((category) => (
              <Link
                key={category.name}
                to={`/category/${encodeURIComponent(category.name)}`}
                className="service-tile"
              >
                <ServiceIcon name={category.icon} size={29} />
                <h3>{category.label || category.name}</h3>
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
