import Head from 'next/head'

export default function RiskPage() {
  return (
    <>
      <Head>
        <title>TriLink Risk</title>
        <meta
          name="description"
          content="TriLink Risk management platform"
        />
      </Head>

      <main style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 24px'
      }}>
        <h1>TriLink Risk</h1>

        <p>
          Risk management, operational risk,
          controls, monitoring and audit oversight.
        </p>

        <section style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
          marginTop: 32
        }}>
          <div>
            <h2>Risk Overview</h2>
            <p>Monitor business and operational risk.</p>
          </div>

          <div>
            <h2>Risk Operations</h2>
            <p>Manage and review operational risk activities.</p>
          </div>

          <div>
            <h2>Controls</h2>
            <p>Review controls and risk mitigation measures.</p>
          </div>

          <div>
            <h2>Monitoring</h2>
            <p>Track risk indicators and operational events.</p>
          </div>

          <div>
            <h2>Audit</h2>
            <p>Connect risk activity with audit oversight.</p>
          </div>
        </section>
      </main>
    </>
  )
}
