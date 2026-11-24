import Reveal from '../motion/Reveal';

export default function PageHero({ kicker, title, description, children }) {
  return (
    <Reveal as="section" className="page-intro">
      <div className="container-app">
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h1>{title}</h1>
        {description && <p className="intro-description">{description}</p>}
        {children}
      </div>
    </Reveal>
  );
}
