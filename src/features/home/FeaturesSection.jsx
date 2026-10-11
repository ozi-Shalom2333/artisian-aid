import { Search, UsersRound, ClipboardCheck } from 'lucide-react';
const steps = [
  {
    icon: Search,
    title: 'Find your person',
    text: 'Browse by skill and area. Get to know the person behind the work.',
  },
  {
    icon: UsersRound,
    title: 'Tell them your idea',
    text: 'Share the job details, address and a preferred date in one simple request.',
  },
  {
    icon: ClipboardCheck,
    title: 'Know what comes next',
    text: 'Track the response in your dashboard. Agree the scope and price before work begins.',
  },
];
export default function FeaturesSection() {
  return (
    <section className="container-app how-section" id="how-it-works">
      <div className="section-heading">
        <div>
          <p className="eyebrow">LESS GUESSWORK. MORE GETTING IT DONE.</p>
          <h2>
            A good connection,
            <br />
            <em>in three simple steps.</em>
          </h2>
        </div>
        <p className="section-summary">
          A clear path from “I need a hand”
          <br />
          to a project with a plan.
        </p>
      </div>
      <div className="steps-grid">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <article key={title}>
            <div className="step-top">
              <span>0{index + 1}</span>
              <Icon size={26} aria-hidden="true" />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
