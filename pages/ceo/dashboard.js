
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const cards = [
  ['customers', 'Customers'],
  ['suppliers', 'Suppliers'],
  ['trade_opportunities', 'Trade Opportunities'],
  ['quotations', 'Quotations'],
  ['orders', 'Orders'],
  ['shipments', 'Shipments'],
  ['energy_projects', 'Energy Projects'],
  ['invoices', 'Invoices'],
  ['payments', 'Payments'],
  ['risks', 'Risks'],
  ['compliance_records', 'Compliance'],
  ['approvals', 'Approvals'],
  ['ai_agents', 'AI Agents'],
  ['ai_tasks', 'AI Tasks'],
  ['ai_actions', 'AI Actions'],
  ['audit_logs', 'Audit Logs'],
  ['system_events', 'System Events']
]

export default function CEODashboard() {
  const [session, setSession] = useState(null)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const sessionResponse = await fetch('/api/ceo/session')
        const sessionData = await sessionResponse.json()

        if (!sessionData.authenticated) {
          window.location.href = '/ceo/login'
          return
        }

        setSession(sessionData)

        const overviewResponse = await fetch('/api/ceo/overview')
        const overviewData = await overviewResponse.json()

        if (!overviewData.ok) {
          throw new Error(overviewData.error || 'Unable to load dashboard')
        }

        setData(overviewData)
      } catch (err) {
        setError(err.message || 'Dashboard error')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  async function logout() {
    await fetch('/api/ceo/logout', { method: 'POST' })
    window.location.href = '/ceo/login'
  }

  return (
    <>
      <Head>
        <title>TriLink Global — CEO Command Centre</title>
        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>

      <main style={styles.page}>
        <div style={styles.container}>

          <header style={styles.header}>
            <div>
              <div style={styles.badge}>
                TRILINK GLOBAL
              </div>

              <h1 style={styles.title}>
                CEO Command Centre
              </h1>

              <p style={styles.subtitle}>
                Founder / Chairman / CEO Executive Control Centre
              </p>
            </div>

            <div style={styles.actions}>
              <Link href="/ceo" style={styles.link}>
                CEO Home
              </Link>

              <button
                onClick={logout}
                style={styles.logout}
              >
                Sign Out
              </button>
            </div>
          </header>

          <section style={styles.security}>
            <span>SECURITY STATUS</span>
            <strong>
              {session?.authenticated
                ? 'AUTHENTICATED'
                : 'CHECKING'}
            </strong>
          </section>

          {loading && (
            <section style={styles.panel}>
              Loading live executive data…
            </section>
          )}

          {error && (
            <section style={styles.error}>
              {error}
            </section>
          )}

          {data && (
            <>
              <section style={styles.status}>
                <div>
                  <span style={styles.small}>
                    DATABASE
                  </span>
                  <strong>
                    {data.database === 'reachable'
                      ? 'CONNECTED'
                      : 'UNAVAILABLE'}
                  </strong>
                </div>

                <div>
                  <span style={styles.small}>
                    LAST REFRESH
                  </span>
                  <strong>
                    {new Date(
                      data.generated_at
                    ).toLocaleString()}
                  </strong>
                </div>
              </section>

              <section style={styles.grid}>
                {cards.map(([key, label]) => (
                  <div
                    key={key}
                    style={styles.card}
                  >
                    <span style={styles.cardLabel}>
                      {label}
                    </span>

                    <strong style={styles.number}>
                      {data.counts?.[key] ?? 0}
                    </strong>
                  </div>
                ))}
              </section>

              <section style={styles.panel}>
                <h2 style={styles.panelTitle}>
                  Executive Control
                </h2>

                <p style={styles.panelText}>
                  Live database connectivity is operational.
                  AI, trade, logistics, energy, finance,
                  risk, compliance and audit modules are
                  connected to the executive data layer.
                </p>
              </section>
            </>
          )}

        </div>
      </main>
    </>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#07111f',
    color: '#f7fafc',
    padding: '32px 20px',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },

  container: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '24px',
    alignItems: 'flex-start',
    marginBottom: '24px'
  },

  badge: {
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '0.16em',
    opacity: 0.5
  },

  title: {
    fontSize: '42px',
    margin: '10px 0 4px'
  },

  subtitle: {
    opacity: 0.6,
    margin: 0
  },

  actions: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },

  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 14px',
    border: '1px solid rgba(255,255,255,.12)',
    borderRadius: '10px'
  },

  logout: {
    cursor: 'pointer',
    color: '#fff',
    background: 'transparent',
    padding: '10px 14px',
    border: '1px solid rgba(255,255,255,.12)',
    borderRadius: '10px'
  },

  security: {
    padding: '18px',
    borderRadius: '14px',
    background: 'rgba(34,197,94,.08)',
    border: '1px solid rgba(34,197,94,.25)',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },

  status: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
    gap: '14px',
    marginBottom: '20px'
  },

  statusItem: {},

  small: {
    display: 'block',
    fontSize: '10px',
    letterSpacing: '0.14em',
    opacity: 0.45,
    marginBottom: '6px'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))',
    gap: '14px'
  },

  card: {
    padding: '22px',
    borderRadius: '16px',
    background: '#0d1b2d',
    border: '1px solid rgba(255,255,255,.09)'
  },

  cardLabel: {
    display: 'block',
    opacity: 0.55,
    fontSize: '13px',
    marginBottom: '12px'
  },

  number: {
    fontSize: '32px'
  },

  panel: {
    marginTop: '22px',
    padding: '24px',
    borderRadius: '16px',
    background: '#0d1b2d',
    border: '1px solid rgba(255,255,255,.09)'
  },

  panelTitle: {
    marginTop: 0
  },

  panelText: {
    opacity: 0.65,
    lineHeight: 1.7
  },

  error: {
    padding: '18px',
    borderRadius: '14px',
    background: 'rgba(239,68,68,.10)',
    border: '1px solid rgba(239,68,68,.25)'
  }
}
