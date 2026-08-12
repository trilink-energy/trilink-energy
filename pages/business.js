import Head from 'next/head';

const businessAreas = [
  {
    title: 'Digital Business Solutions',
    description:
      'Digital products, websites and business systems designed around practical organisational requirements.',
  },
  {
    title: 'Technology & AI',
    description:
      'Technology, AI and automation capabilities intended to improve business processes, productivity and digital operations.',
  },
  {
    title: 'Global Trade & Connectivity',
    description:
      'A business direction focused on improving connections between businesses, markets, partners and international opportunities.',
  },
  {
    title: 'Cloud & Digital Infrastructure',
    description:
      'Modern cloud-based infrastructure supporting scalable websites, applications and digital services.',
  },
];

export default function Business() {
  return (
    <>
      <Head>
        <title>TriLink Business | Digital, Technology, Trade & Connectivity</title>
        <meta
          name="description"
          content="Discover TriLink's business areas across digital solutions, technology, AI, cloud infrastructure, trade and global connectivity."
        />
        <link
          rel="canonical"
          href="https://trilink.platformsify.workers.dev/business"
        />
        <meta
          property="og:title"
          content="TriLink Business"
        />
        <meta
          property="og:description"
          content="TriLink business areas across digital technology, AI, cloud infrastructure, trade and global connectivity."
        />
        <meta
          property="og:url"
          content="https://trilink.platformsify.workers.dev/business"
        />
        <meta property="og:type" content="website" />
      </Head>

      <main
        id="main-content"
        style={{
          padding: '4rem 2rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <header>
          <p>TRILINK</p>
          <h1>Business</h1>
          <p>
            TriLink is being developed as a modern business platform
            connecting digital technology, innovation, trade and global
            business opportunities.
          </p>
        </header>

        <section
          aria-labelledby="business-areas"
          style={{ marginTop: '3rem' }}
        >
          <h2 id="business-areas">Business Areas</h2>

          <div>
            {businessAreas.map((area) => (
              <article
                key={area.title}
                style={{
                  margin: '1rem 0',
                  padding: '1.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '12px',
                }}
              >
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>Our Approach</h2>
          <p>
            TriLink focuses on practical technology and business
            infrastructure rather than unnecessary complexity. The platform
            is designed to provide a foundation that can grow as products,
            services and partnerships develop.
          </p>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>Partnerships & Opportunities</h2>
          <p>
            Businesses, technology partners and organisations interested in
            working with TriLink can contact us to discuss potential
            opportunities.
          </p>

          <p>
            <a href="/contact">Contact TriLink</a>
          </p>
        </section>
      </main>
    </>
  );
}
