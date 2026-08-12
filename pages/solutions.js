import Head from 'next/head';
import Link from 'next/link';

const solutions = [
  {
    title: 'Business Websites',
    description:
      'Professional websites designed to establish a clear digital presence and provide customers with an accessible point of contact.',
  },
  {
    title: 'Digital Platforms',
    description:
      'Web-based platforms designed to support business workflows, services, information and future digital products.',
  },
  {
    title: 'AI & Automation',
    description:
      'Practical opportunities to use artificial intelligence and automation to streamline repetitive processes and improve efficiency.',
  },
  {
    title: 'Cloud Solutions',
    description:
      'Modern cloud infrastructure for digital applications, websites and services that need a scalable technical foundation.',
  },
  {
    title: 'Digital Growth',
    description:
      'Search, content and digital strategy designed to help businesses improve their online visibility and customer reach.',
  },
  {
    title: 'Business Connectivity',
    description:
      'Digital tools and infrastructure intended to help organisations connect with customers, partners and wider markets.',
  },
];

export default function Solutions() {
  return (
    <>
      <Head>
        <title>TriLink Solutions | Digital Business & Technology</title>
        <meta
          name="description"
          content="Explore TriLink solutions for websites, digital platforms, AI, automation, cloud infrastructure, digital growth and business connectivity."
        />
        <link
          rel="canonical"
          href="https://trilink.platformsify.workers.dev/solutions"
        />
        <meta property="og:title" content="TriLink Solutions" />
        <meta
          property="og:description"
          content="Digital business and technology solutions from TriLink."
        />
        <meta
          property="og:url"
          content="https://trilink.platformsify.workers.dev/solutions"
        />
        <meta property="og:type" content="website" />
      </Head>

      <main
        id="main-content"
        style={{
          maxWidth: '1150px',
          margin: '0 auto',
          padding: '4rem 2rem',
        }}
      >
        <section>
          <p>TRILINK SOLUTIONS</p>
          <h1>Solutions built around business needs.</h1>
          <p>
            TriLink brings together digital technology, infrastructure and
            business capabilities to create practical solutions for
            organisations at different stages of growth.
          </p>
        </section>

        <section
          aria-labelledby="solutions"
          style={{ marginTop: '3rem' }}
        >
          <h2 id="solutions">Our Solutions</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
            }}
          >
            {solutions.map((solution) => (
              <article
                key={solution.title}
                style={{
                  padding: '1.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '14px',
                }}
              >
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2>Start a Conversation</h2>
          <p>
            If you have a business requirement, technology project or
            partnership idea, tell us what you are looking to achieve.
          </p>

          <Link href="/contact">Discuss your requirements</Link>
        </section>
      </main>
    </>
  );
}
