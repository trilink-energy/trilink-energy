import Head from 'next/head'

export default function ApprovalsPage() {
  return (
    <>
      <Head>
        <title>TriLink Approvals</title>
        <meta
          name="description"
          content="TriLink approval management platform"
        />
      </Head>

      <main style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 24px'
      }}>
        <h1>TriLink Approvals</h1>

        <p>
          Central approval workflow for finance, trade,
          logistics, energy, customers, suppliers and AI.
        </p>

        <section style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
          marginTop: 32
        }}>
          <div>
            <h2>Pending</h2>
            <p>Review outstanding approval requests.</p>
          </div>

          <div>
            <h2>Approved</h2>
            <p>View completed approvals.</p>
          </div>

          <div>
            <h2>Rejected</h2>
            <p>View rejected requests.</p>
          </div>

          <div>
            <h2>Critical</h2>
            <p>Review high-risk decisions.</p>
          </div>

          <div>
            <h2>Audit</h2>
            <p>Review approval decisions and timestamps.</p>
          </div>
        </section>
      </main>
    </>
  )
}
