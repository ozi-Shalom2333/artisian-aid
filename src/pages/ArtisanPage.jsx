import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Card from '../components/Card';
import useResource from '../hooks/useResource';
import { useServices } from '../services/context';
import PageHero from '../components/shared/PageHero';
import EmptyState from '../components/shared/EmptyState';
import ErrorState from '../components/shared/ErrorState';
import { Skeleton } from '../components/ui/skeleton';
export default function ArtisanPage() {
  const { services } = useServices();
  const { nameOfCategory } = useParams();
  const [params, setParams] = useSearchParams();
  const resource = useResource(services.listArtisans);
  const categoriesResource = useResource(services.listCategories);
  const locationsResource = useResource(services.listLocations);
  const categories = categoriesResource.data || [];
  const locations = locationsResource.data || [];
  const query = params.get('q') || '';
  const category = nameOfCategory || params.get('service') || '';
  const area = params.get('area') || '';
  const availableOnly = params.get('available') === '1';
  function update(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }
  const data = (resource.data || [])
    .filter(
      (user) =>
        (!category || user.category === category) &&
        (!area || user.location?.lga === area) &&
        (!availableOnly || user.availability) &&
        (!query ||
          `${user.fullname} ${user.businessName} ${user.category} ${user.bio} ${user.location?.lga}`
            .toLowerCase()
            .includes(query.toLowerCase())),
    )
    .sort((a, b) =>
      params.get('sort') === 'name'
        ? a.fullname.localeCompare(b.fullname)
        : Number(b.availability) - Number(a.availability),
    );
  return (
    <>
      <PageHero
        kicker="LOCAL PEOPLE. REAL POSSIBILITIES."
        title={
          nameOfCategory ? (
            categories.find((c) => c.name === nameOfCategory)?.label || nameOfCategory
          ) : (
            <>
              Find the right hands
              <br />
              <em>for your next project.</em>
            </>
          )
        }
        description="Explore skills, get to know an artisan and start with a clear request."
      />
      <section className="container-app discovery-section">
        <div className="discovery-toolbar">
          <div className="search-field">
            <Search size={19} aria-hidden="true" />
            <label className="sr-only" htmlFor="discovery-search">
              Search artisans, skills or businesses
            </label>
            <input
              id="discovery-search"
              value={query}
              onChange={(e) => update('q', e.target.value)}
              placeholder="Search a skill, name or business"
            />
          </div>
          {!nameOfCategory && (
            <div className="filter-field">
              <label htmlFor="service-filter">Service</label>
              <select
                id="service-filter"
                value={category}
                onChange={(e) => update('service', e.target.value)}
              >
                <option value="">All services</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.label || c.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="filter-field">
            <label htmlFor="area-filter">Area</label>
            <select id="area-filter" value={area} onChange={(e) => update('area', e.target.value)}>
              <option value="">All Lagos</option>
              {locations.map((lga) => (
                <option key={lga}>{lga}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="results-toolbar">
          <p role="status">
            {resource.loading
              ? 'Finding artisans…'
              : `${data.length} ${data.length === 1 ? 'artisan' : 'artisans'}`}{' '}
            {category && (
              <Link to="/artisanpage" className="text-link small-link">
                All services
              </Link>
            )}
          </p>
          <label className="check-label">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => update('available', e.target.checked ? '1' : '')}
            />
            Open to requests
          </label>
          <div className="sort-field">
            <SlidersHorizontal size={15} aria-hidden="true" />
            <label className="sr-only" htmlFor="sort">
              Sort artisans
            </label>
            <select
              id="sort"
              value={params.get('sort') || 'availability'}
              onChange={(e) => update('sort', e.target.value)}
            >
              <option value="availability">Availability first</option>
              <option value="name">Name, A to Z</option>
            </select>
          </div>
        </div>
        {resource.loading ? (
          <div className="cards-grid" role="status" aria-label="Loading artisans">
            {[1, 2, 3, 4, 5, 6].map((n) => (
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
        ) : !data.length ? (
          <EmptyState
            title="No matches just yet"
            description="Try another skill or area, or clear your filters to see the community."
            action={
              nameOfCategory ? (
                <Link className="button" to="/artisanpage">
                  Explore all artisans
                </Link>
              ) : (
                <button className="button button-outline" onClick={() => setParams({})}>
                  <X size={16} />
                  Clear filters
                </button>
              )
            }
          />
        ) : (
          <div className="cards-grid">
            {data.map((artisan) => (
              <Card key={artisan._id} data={artisan} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
