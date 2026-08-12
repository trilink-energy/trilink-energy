const areas = [
  'International trade',
  'Business sourcing',
  'Digital platforms',
  'AI & automation',
  'Cloud infrastructure',
  'Strategic partnerships',
];

export default function BusinessPillars() {
  return (
    <section className="section section-dark">
      <div className="split-layout">
        <div>
          <span className="eyebrow">THE TRILINK MODEL</span>
          <h2>Built to connect the physical and digital economy.</h2>
        </div>

        <div>
          <p className="large-copy">
            TriLink is designed as a flexible business platform. Its focus is
            not one product or one market, but the connections that allow
            businesses and opportunities to move between markets.
          </p>

          <div className="tag-list">
            {areas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
