const pillars = [
  {
    number: '01',
    title: 'Trade & Connectivity',
    text:
      'Building practical connections between businesses, suppliers, markets and commercial opportunities.',
  },
  {
    number: '02',
    title: 'Digital Business',
    text:
      'Using modern digital infrastructure to help businesses establish, operate and grow online.',
  },
  {
    number: '03',
    title: 'Technology',
    text:
      'Applying web, cloud, AI and automation technologies to solve real business problems.',
  },
  {
    number: '04',
    title: 'Global Opportunities',
    text:
      'Creating pathways for international collaboration, partnerships and market development.',
  },
];

export default function Features() {
  return (
    <section className="section" id="business-pillars">
      <div className="section-heading">
        <span className="eyebrow">WHAT WE DO</span>
        <h2>One business. Multiple connected capabilities.</h2>
        <p>
          TriLink brings commercial connectivity and digital capability
          together under one independent business platform.
        </p>
      </div>

      <div className="pillar-grid">
        {pillars.map((pillar) => (
          <article className="pillar-card" key={pillar.number}>
            <span className="pillar-number">{pillar.number}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
