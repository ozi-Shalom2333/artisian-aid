import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '../../data/catalog';
import ServiceIcon from '../../components/shared/ServiceIcon';
export default function CategoriesSection() {
  return (
    <section className="services-section">
      <div className="container-app">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A HAND FOR EVERY TASK</p>
            <h2>What’s on your to-do list?</h2>
          </div>
          <Link className="text-link" to="/category">
            All services <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="service-grid">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.name}
              to={`/category/${encodeURIComponent(category.name)}`}
              className="service-tile"
            >
              <ServiceIcon name={category.icon} size={29} />
              <h3>{category.label}</h3>
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
