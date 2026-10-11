import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '../data/catalog';
import PageHero from '../components/shared/PageHero';
import ServiceIcon from '../components/shared/ServiceIcon';
export default function CategoryPage() {
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
      <section className="container-app category-page-grid">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            to={`/category/${encodeURIComponent(category.name)}`}
            className="category-page-card"
          >
            <span className="category-number">0{index + 1}</span>
            <ServiceIcon name={category.icon} size={44} />
            <h2>{category.label}</h2>
            <p>{category.description}</p>
            <span className="text-link">
              Explore artisans <ArrowUpRight size={18} />
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}
