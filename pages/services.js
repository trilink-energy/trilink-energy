import Head from 'next/head';
import Link from 'next/link';
import BUSINESS from '../lib/business.config';

export default function Services() {
  return (
    <>
      <Head>
        <title>Services | TriLink</title>
        <meta
          name="description"
          content="Explore TriLink Trade, TriLink Digital and TriLink Infrastructure — connecting trade, technology, businesses and global opportunities."
        />
        <link
          rel="canonical"
          href={`${BUSINESS.productionUrl}/services`}
        />
        <meta property="og:title" content="Services | TriLink" />
        <meta
          property="og:description"
          content="Trade, technology and digital infrastructure through TriLink."
        />
        <meta
          property="og:url"
          content={`${BUSINESS.productionUrl}/services`}
        />
        <meta property="og:type" content="website" />
      </Head>

      <main id="main-content">
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">WHAT WE DO</span>
            <h1>Trade. Technology. Connectivity.</h1>
            <p>
              TriLink brings together business connectivity, digital
              technology and infrastructure to help organisations build,
              connect and expand.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">OUR BUSINESS</span>
              <h2>Three connected areas of capability</h2>
              <p>
                Our structure allows TriLink to work across business,
                technology and international connectivity while keeping each
                area clearly defined.
              </p>
            </div>

            <div className="card-grid">
              {BUSINESS.divisions.map((division) => (
                <article className="business-card" key={division.slug}>
                  <span className="card-number">
                    {String(BUSINESS.divisions.indexOf(division) + 1).padStart(
                      2,
                      '0'
                    )}
                  </span>

                  <h2>{division.name}</h2>
                  <h3>{division.title}</h3>
                  <p>{division.description}</p>

                  <ul>
                    {division.capabilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">HOW WE THINK</span>
              <h2>Built around long-term value</h2>
            </div>

            <div className="card-grid">
              {BUSINESS.principles.map((principle) => (
                <article className="principle-card" key={principle.title}>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-content">
            <span className="eyebrow">START A CONVERSATION</span>
            <h2>Have a business opportunity?</h2>
            <p>
              Tell us what you are building, sourcing, connecting or trying
              to achieve.
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
