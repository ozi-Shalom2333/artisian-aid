import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/shared/PageHero';
import FeaturesSection from '../features/home/FeaturesSection';
import { team } from '../data/team';
export default function AboutUs() {
  return (
    <>
      <PageHero
        kicker="OUR STORY"
        title={
          <>
            Good craft deserves
            <br />
            <em>a good connection.</em>
          </>
        }
        description="Artisan Aid brings local skills and everyday needs a little closer together."
      />
      <section className="container-app story-layout">
        <img src="/media/workshop.webp" alt="Two craftspeople discussing a project in a workshop" />
        <div>
          <p className="eyebrow">BUILT AROUND PEOPLE</p>
          <h2>
            A place for skill.
            <br />
            <em>And the people behind it.</em>
          </h2>
          <p>
            Finding someone to help with a home project can start with a lot of asking around. For
            an artisan, getting good work seen can be just as difficult.
          </p>
          <p>
            Artisan Aid is designed to make that introduction clearer. Clients can explore a
            person’s skills, location and work. Artisans can share a profile and manage requests in
            one place.
          </p>
          <p>
            Behind Artisan Aid is a collaborative team working across product design, frontend and
            backend development. Each contributor has helped shape the project and its vision.
          </p>
          <Link className="button" to="/artisanpage">
            Explore artisans <ArrowUpRight size={18} />
          </Link>
          <Link className="text-link story-team-link" to="/meetTeam">
            Meet all {team.length} contributors <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <FeaturesSection />
    </>
  );
}
