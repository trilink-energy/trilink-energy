import Head from 'next/head';
import Link from 'next/link';

export default function Global() {
  return (
    <>
      <Head>
        <title>TriLink Global | Global Business Connectivity</title>
        <meta
          name="description"
          content="TriLink Global connects businesses, partners and markets across borders."
        />
        <link
          rel="canonical"
          href="https://trilink-energy.platformsify.workers.dev/global"
        />
      </Head>

      <main style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <p>TRILINK GLOBAL</p>
        <h1>Global Business Connectivity</h1>
        <p>
          Building connections between businesses, partners and markets across
          borders.
        </p>

        <h2>Our focus</h2>
        <ul>
          <li>International business introductions</li>
          <li>Cross-border opportunities</li>
          <li>Strategic market connections</li>
          <li>Business relationship development</li>
        </ul>

        <p>
          <Link href="/contact">Explore a partnership →</Link>
        </p>
      </main>
    </>
  );
}
