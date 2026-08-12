import Head from 'next/head';
import Link from 'next/link';

export default function Partners() {
  return (
    <>
      <Head>
        <title>TriLink Partners | Business & Technology Partnerships</title>
        <meta
          name="description"
          content="TriLink partnerships for businesses, technology providers and organisations exploring digital and international opportunities."
        />
        <link
          rel="canonical"
          href="https://trilink.platformsify.workers.dev/partners"
        />
        <meta property="og:title" content="TriLink Partners" />
        <meta
          property="og:description"
          content="Explore partnership opportunities with TriLink."
        />
        <meta
          property="og:url"
          content="https://trilink.platformsify.workers.dev/partners"
        />
        <meta property="og:type" content="website" />
      </Head>

      <main
        id="main-content"
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '4rem 2rem',
        }}
      >
        <p>TRILINK PARTNERS</p>

        <h1>Build opportunities together.</h1>

        <p>
          TriLink is open to conversations with businesses, technology
          providers, entrepreneurs and organisations where there is a clear
          opportunity to create mutual value.
        </p>

        <section style={{ marginTop: '3rem' }}>
          <h2>Who We Can Work With</h2>

          <ul>
            <li>Business and technology organisations</li>
            <li>Digital service providers</li>
            <li>Entrepreneurs and founders</li>
            <li>Commercial and strategic partners</li>
            <li>Organisations exploring international opportunities</li>
          </ul>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>Partnership Discussions</h2>

          <p>
            Each opportunity can be assessed individually based on its
            objectives, requirements and commercial potential.
          </p>

          <Link href="/contact">Contact TriLink</Link>
        </section>
      </main>
    </>
  );
}
