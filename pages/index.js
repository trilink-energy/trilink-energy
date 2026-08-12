import Head from 'next/head';
import Link from 'next/link';
import BUSINESS from '../lib/business.config';

export default function Home() {
  return (
    <>
      <Head>
        <title>{BUSINESS.title || 'TriLink | Trade, Technology & Global Connectivity'}</title>
        <meta
          name="description"
          content={BUSINESS.description}
        />
        <link rel="canonical" href={BUSINESS.productionUrl} />
        <meta
          property="og:title"
          content="TriLink | Trade, Technology & Global Connectivity"
        />
        <meta
          property="og:description"
          content={BUSINESS.description}
        />
        <meta
          property="og:url"
          content={BUSINESS.productionUrl}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main id="main-content">
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow">TRILINK</span>

              <h1>
                Trade.
                <br />
                Technology.
                <br />
                Connectivity.
              </h1>

              <p className="hero-lead">
                Connecting businesses, markets and technology to create
                practical opportunities across borders.
              </p>

              <div className="hero-actions">
                <Link href="/services" className="button">
                  Explore TriLink
                </Link>

                <Link href="/contact" className="button button-secondary">
                  Start a Conversation
                </Link>
              </div>
            </div>

            <div className="hero-panel">
              <div className="hero-panel-inner">
                <span>GLOBAL BUSINESS PLATFORM</span>
                <strong>Connecting opportunity with execution.</strong>
                <p>
                  TriLink brings trade connectivity, digital solutions and
                  modern infrastructure together under one business platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">THE TRILINK MODEL</span>
              <h2>Three connected capabilities.</h2>
              <p>
                TriLink is structured around three complementary areas,
                allowing us to approach business opportunities from both
                commercial and technological perspectives.
              </p>
            </div>

            <div className="card-grid">
              {BUSINESS.divisions.map((division, index) => (
                <article className="business-card" key={division.slug}>
                  <span className="card-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h2>{division.name}</h2>

                  <h3>{division.title}</h3>

                  <p>{division.description}</p>

                  <ul>
                    {division.capabilities.slice(0, 3).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container split-section">
            <div>
              <span className="eyebrow">WHY TRILINK</span>
              <h2>Built for connected business.</h2>
            </div>

            <div>
              <p>
                International business increasingly depends on strong
                relationships, reliable technology and the ability to move
                quickly between markets.
              </p>

              <p>
                TriLink is designed around that intersection — helping
                businesses connect opportunities with practical digital and
                commercial capabilities.
              </p>

              <Link href="/about" className="text-link">
                Discover our vision →
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">OUR PRINCIPLES</span>
              <h2>How we approach business.</h2>
            </div>

            <div className="principles-grid">
              {BUSINESS.principles.map((principle) => (
                <article key={principle.title}>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-content">
            <span className="eyebrow">CONNECT WITH TRILINK</span>

            <h2>Have an opportunity worth exploring?</h2>

            <p>
              Whether you are looking for a business connection, technology
              capability, trade relationship or strategic partnership, start
              the conversation with TriLink.
            </p>

            <Link href="/contact" className="button">
              Contact TriLink
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
