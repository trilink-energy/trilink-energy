import Head from 'next/head';
import Link from 'next/link';

export default function Trade() {
  return (
    <>
      <Head>
        <title>TriLink Trade | International Trade & Sourcing</title>
        <meta
          name="description"
          content="TriLink Trade connects suppliers, buyers and commercial opportunities across international markets."
        />
        <link
          rel="canonical"
          href="https://trilink.platformsify.workers.dev/trade"
        />
      </Head>

      <main style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <p>TRILINK TRADE</p>
        <h1>International Trade & Sourcing</h1>
        <p>
          Connecting suppliers, buyers and commercial opportunities across
          international markets.
        </p>

        <h2>What we focus on</h2>
        <ul>
          <li>Supplier and buyer connectivity</li>
          <li>International sourcing opportunities</li>
          <li>Market and commercial introductions</li>
          <li>Cross-border business coordination</li>
        </ul>

        <p>
          <Link href="/contact">Discuss a trade opportunity →</Link>
        </p>
      </main>
    </>
  );
}
