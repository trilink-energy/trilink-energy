import Head from 'next/head';
import Link from 'next/link';
import {
  businessUnits,
  company,
  operatingPrinciples,
} from '../lib/data/business';

export default function About() {
  return (
    <>
      <Head>
        <title>About {company.name} | Our Vision & Business</title>

        <meta
          name="description"
          content="Learn about TriLink, our business structure, operating principles and vision for connecting trade, technology and global business."
        />

        <link
          rel="canonical"
          href={`${company.productionUrl}/about`}
        />

        <meta
          property="og:title"
          content={`About ${company.name}`}
        />

        <meta
          property="og:description"
          content="Discover TriLink's vision, business structure and approach to building connected commercial and technology solutions."
        />

        <meta
          property="og:url"
          content={`${company.productionUrl}/about`}
        />

        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '4rem 1.5rem',
        }}
      >
        {/* INTRODUCTION */}

        <section
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
          }}
        >
          <p
            style={{
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            About {company.name}
          </p>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              lineHeight: 1.1,
            }}
          >
            Building connections between
            <br />
            business and technology
          </h1>

          <p
            style={{
              maxWidth: '780px',
              margin: '1.5rem auto',
              lineHeight: 1.8,
              fontSize: '1.1rem',
            }}
          >
            {company.description}
          </p>
        </section>

        {/* WHO WE ARE */}

        <section
          style={{
            marginBottom: '4rem',
          }}
        >
          <h2>Who We Are</h2>

          <p style={{ lineHeight: 1.8 }}>
            TriLink is being developed as a connected business platform
            bringing together commercial activity and modern technology.
            The business is structured around focused capabilities rather
            than treating every opportunity as the same type of service.
          </p>

          <p style={{ lineHeight: 1.8 }}>
            This approach allows TriLink to develop different areas of the
            business independently while maintaining a common corporate
            direction.
          </p>
        </section>

        {/* VISION */}

        <section
          style={{
            padding: '2rem',
            border: '1px solid #ddd',
            borderRadius: '16px',
            marginBottom: '4rem',
          }}
        >
          <h2>Our Vision</h2>

          <p style={{ lineHeight: 1.8 }}>
            Our vision is to build a trusted platform that helps connect
            businesses, technology, markets and opportunities across
            borders.
          </p>

          <p style={{ lineHeight: 1.8 }}>
            We aim to combine practical commercial thinking with modern
            digital infrastructure so that businesses can communicate,
            operate and grow more effectively.
          </p>
        </section>

        {/* BUSINESS STRUCTURE */}

        <section
          aria-labelledby="structure-heading"
          style={{
            marginBottom: '4rem',
          }}
        >
          <header style={{ marginBottom: '2rem' }}>
            <p
              style={{
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Business Structure
            </p>

            <h2 id="structure-heading">
              Four connected areas of focus
            </h2>
          </header>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {businessUnits.map((unit) => (
              <article
                key={unit.slug}
                style={{
                  padding: '1.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '16px',
                }}
              >
                <h3>{unit.name}</h3>

                <p
                  style={{
                    fontWeight: 700,
                  }}
                >
                  {unit.title}
                </p>

                <p style={{ lineHeight: 1.65 }}>
                  {unit.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* HOW WE WORK */}

        <section
          aria-labelledby="principles-heading"
          style={{
            marginBottom: '4rem',
          }}
        >
          <header style={{ marginBottom: '2rem' }}>
            <p
              style={{
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Our Approach
            </p>

            <h2 id="principles-heading">
              Principles that guide the business
            </h2>
          </header>

          <div>
            {operatingPrinciples.map((principle, index) => (
              <div
                key={principle}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  padding: '1rem 0',
                  borderBottom: '1px solid #ddd',
                }}
              >
                <strong>{String(index + 1).padStart(2, '0')}</strong>

                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {principle}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST */}

        <section
          style={{
            padding: '2rem',
            background: '#f5f5f5',
            borderRadius: '16px',
            marginBottom: '4rem',
          }}
        >
          <h2>Built for long-term growth</h2>

          <p style={{ lineHeight: 1.8 }}>
            TriLink is being built with a long-term approach. That means
            establishing clear business units, reliable digital
            infrastructure and straightforward communication before
            expanding into additional products, markets and partnerships.
          </p>

          <p style={{ lineHeight: 1.8 }}>
            We believe credibility comes from execution, transparency and
            delivering useful solutions — not from making unsupported
            claims.
          </p>
        </section>

        {/* CTA */}

        <section
          style={{
            textAlign: 'center',
          }}
        >
          <h2>Talk to TriLink</h2>

          <p
            style={{
              maxWidth: '650px',
              margin: '1rem auto 1.5rem',
              lineHeight: 1.7,
            }}
          >
            If you have a commercial opportunity, technology requirement
            or potential partnership to discuss, we would like to hear
            from you.
          </p>

          <Link href="/contact">
            Contact TriLink
          </Link>
        </section>
      </main>
    </>
  );
}
