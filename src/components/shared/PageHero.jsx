export default function PageHero({ kicker, title, description, children }) {
  return (
    <section className="page-intro">
      <div className="container-app">
        {kicker && <p className="eyebrow">{kicker}</p>}
        <h1>{title}</h1>
        {description && <p className="intro-description">{description}</p>}
        {children}
      </div>
    </section>
  );
}
