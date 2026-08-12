import Head from 'next/head';
import Link from 'next/link';

export default function Logistics() {
  return (
    <>
      <Head>
        <title>TriLink Logistics | Logistics & Supply Chain</title>
        <meta
          name="description"
          content="TriLink Logistics supports cross-border logistics coordination and supply-chain connectivity."
        />
        <link
          rel="canonical"
          href="https://trilink.platformsify.workers.dev/logistics"
        />
      </Head>

      <main style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <p>TRILINK LOGISTICS</p>
        <h1>Logistics & Supply Chain</h1>
        <p>
          Supporting businesses with cross-border logistics coordination and
          supply-chain connectivity.
        </p>

        <h2>Our focus</h2>
        <ul>
          <li>Supply-chain coordination</li>
          <li>Cross-border logistics connectivity</li>
          <li>Trade-flow coordination</li>
          <li>Business and logistics introductions</li>
        </ul>

        <p>
          <Link href="/contact">Discuss a logistics requirement →</Link>
        </p>
      </main>
    </>
  );
}
