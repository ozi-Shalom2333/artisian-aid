import PageHero from '../components/shared/PageHero';
import Avatar from '../components/shared/Avatar';
import EmptyState from '../components/shared/EmptyState';
import { Skeleton } from '../components/ui/skeleton';
import useResource from '../hooks/useResource';
import { useServices } from '../services/context';
import Reveal from '../components/motion/Reveal';
export default function MeetTeam() {
  const { services } = useServices();
  const resource = useResource(services.listTeam);
  const members = resource.data || [];
  return (
    <>
      <PageHero
        kicker="OUR PEOPLE"
        title={
          <>
            Meet the team
            <br />
            <em>behind the vision.</em>
          </>
        }
        description="Artisan Aid is a shared effort, shaped by the contributions of our product design, frontend and backend team."
      />
      <section
        className="container-app page-section"
        aria-label="Team members and contributor credits"
      >
        {resource.loading ? (
          <div className="team-grid" role="status" aria-label="Loading team members">
            {[1, 2, 3, 4].map((n) => (
              <div className="team-card" key={n}>
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="mt-5 h-5 w-3/4" />
                <Skeleton className="mt-2.5 h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : !members.length ? (
          <EmptyState
            title="No team members listed yet"
            description="Contributor profiles will appear here once loaded from the service."
          />
        ) : (
          <div className="team-grid">
            {members.map(({ name, role, photo }) => (
              <Reveal as="article" className="team-card" key={name}>
                {photo ? <img src={photo} alt={name} loading="lazy" /> : <Avatar name={name} />}
                <h2>{name}</h2>
                <p>{role}</p>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
