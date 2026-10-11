import PageHero from '../components/shared/PageHero';
import Avatar from '../components/shared/Avatar';
import { team } from '../data/team';
export default function MeetTeam() {
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
        className="container-app team-grid"
        aria-label="Team members and contributor credits"
      >
        {team.map(({ name, role, photo }) => (
          <article className="team-card" key={name}>
            {photo ? <img src={photo} alt={name} loading="lazy" /> : <Avatar name={name} />}
            <h2>{name}</h2>
            <p>{role}</p>
          </article>
        ))}
      </section>
    </>
  );
}
