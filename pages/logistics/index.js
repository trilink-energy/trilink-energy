import Head from 'next/head'

export default function LogisticsPage() {
  return (
    <>
      <Head>
        <title>TriLink Logistics</title>
        <meta
          name="description"
          content="TriLink Logistics management platform"
        />
      </Head>

      <main style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 24px'
      }}>
        <h1>TriLink Logistics</h1>

        <p>
          Logistics operations, shipment management and tracking.
        </p>

        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
          marginTop: 32
        }}>
          <div>
            <h2>Shipments</h2>
            <p>Create and manage shipments.</p>
          </div>

          <div>
            <h2>Routes</h2>
            <p>Manage logistics routes.</p>
          </div>

          <div>
            <h2>Tracking</h2>
            <p>Monitor shipment progress.</p>
          </div>

          <div>
            <h2>Documents</h2>
            <p>Manage shipment documentation.</p>
          </div>

          <div>
            <h2>Delivery</h2>
            <p>Track delivery completion.</p>
          </div>
        </section>
      </main>
    </>
  )
}
