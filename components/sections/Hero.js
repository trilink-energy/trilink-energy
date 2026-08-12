import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="eyebrow">TRADE • TECHNOLOGY • CONNECTIVITY</span>

        <h1>
          Connecting trade,
          <span> technology </span>
          & global business.
        </h1>

        <p className="hero-text">
          TriLink creates practical connections between businesses, markets
          and technology — helping turn opportunities into scalable,
          long-term partnerships.
        </p>

        <div className="hero-actions">
          <Link href="/services" className="button button-primary">
            Explore TriLink
          </Link>

          <Link href="/contact" className="button button-secondary">
            Start a Business Conversation
          </Link>
        </div>
      </div>

      <div className="hero-panel" aria-hidden="true">
        <div className="network-card">
          <span>TRILINK</span>
          <strong>Global Business Network</strong>
          <div className="network-line" />
          <div className="network-nodes">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
