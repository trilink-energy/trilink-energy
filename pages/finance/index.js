import Head from 'next/head'

export default function FinancePage() {
  return (
    <>
      <Head>
        <title>TriLink Finance</title>
        <meta
          name="description"
          content="TriLink Finance management platform"
        />
      </Head>

      <main style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 24px'
      }}>
        <h1>TriLink Finance</h1>

        <p>
          Financial management, invoices, payments,
          transactions and reporting.
        </p>

        <section style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
          marginTop: 32
        }}>
          <div>
            <h2>Invoices</h2>
            <p>Create and manage business invoices.</p>
          </div>

          <div>
            <h2>Payments</h2>
            <p>Track incoming and outgoing payments.</p>
          </div>

          <div>
            <h2>Transactions</h2>
            <p>Manage financial transactions.</p>
          </div>

          <div>
            <h2>Reports</h2>
            <p>View financial performance information.</p>
          </div>

          <div>
            <h2>Approvals</h2>
            <p>Route financial actions for approval.</p>
          </div>
        </section>
      </main>
    </>
  )
}
