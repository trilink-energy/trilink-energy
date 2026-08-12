import Head from 'next/head';
import Link from 'next/link';

export default function Digital() {
  return (
    <>
      <Head>
        <title>TriLink Digital | Technology & Innovation</title>
        <meta
          name="description"
          content="TriLink Digital provides websites, digital platforms, AI, automation and technology solutions for modern businesses."
        />
        <link
          rel="canonical"
          href="https://trilink.platformsify.workers.dev/digital"
        />
      </Head>

      <main style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <p>TRILINK DIGITAL</p>
        <h1>Digital Technology & Innovation</h1>
        <p>
          Practical digital technology designed around modern business needs.
        </p>

        <h2>Capabilities</h2>
        <ul>
          <li>Business websites</li>
          <li>Digital platforms</li>
          <li>AI and automation</li>
          <li>Cloud-based applications</li>
          <li>Digital workflow solutions</li>
        </ul>

        <p>
          <Link href="/contact">Discuss a digital project →</Link>
        </p>
      </main>
    </>
  );
}
