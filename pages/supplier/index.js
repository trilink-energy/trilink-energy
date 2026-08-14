import { useEffect, useState } from 'react'

export default function SupplierPortal() {
  const [loading, setLoading] = useState(true)
  const [supplier, setSupplier] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    /*
     * Supplier authentication will use the dedicated supplier
     * authentication layer when that layer is enabled.
     *
     * We intentionally do not use CEO authentication here.
     */
    fetch('/api/auth/supplier-session', {
      credentials: 'include'
    })
      .then(async response => {
        const data = await response.json()

        if (!response.ok || !data?.authenticated) {
          window.location.href = '/supplier/login'
          return
        }

        setSupplier(
          data.supplier ||
          data.session ||
          data.user ||
          null
        )

        setLoading(false)
      })
      .catch(() => {
        setError('Unable to load supplier session.')
        setLoading(false)
      })
  }, [])

  async function logout() {
    try {
      await fetch('/api/auth/supplier-logout', {
        method: 'POST',
        credentials: 'include'
      })
    } finally {
      window.location.href = '/supplier/login'
    }
  }

  if (loading) {
    return (
      <main style={styles.center}>
        Loading supplier portal...
      </main>
    )
  }

  if (error) {
    return (
      <main style={styles.center}>
        {error}
      </main>
    )
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>
            TriLink Supplier Portal
          </h1>

          <p style={styles.subtitle}>
            Secure supplier workspace
          </p>
        </div>

        <button
          onClick={logout}
          style={styles.button}
        >
          Sign out
        </button>
      </header>

      <section style={styles.welcome}>
        <h2>
          Welcome
          {supplier?.company_name
            ? ` — ${supplier.company_name}`
            : ''}
        </h2>

        <p>
          Manage your TriLink supplier activity
          from one secure workspace.
        </p>
      </section>

      <section style={styles.grid}>

        <article style={styles.card}>
          <h2>Supplier Profile</h2>
          <p>
            Company information, contacts,
            addresses and account details.
          </p>
          <a href="/supplier/profile">
            Manage profile
          </a>
        </article>

        <article style={styles.card}>
          <h2>Products</h2>
          <p>
            Manage products, specifications,
            pricing and availability.
          </p>
          <a href="/supplier/products">
            View products
          </a>
        </article>

        <article style={styles.card}>
          <h2>Purchase Orders</h2>
          <p>
            View purchase orders and order status.
          </p>
          <a href="/supplier/orders">
            View orders
          </a>
        </article>

        <article style={styles.card}>
          <h2>Shipments</h2>
          <p>
            Track supplier shipments and delivery
            information.
          </p>
          <a href="/supplier/shipments">
            View shipments
          </a>
        </article>

        <article style={styles.card}>
          <h2>Invoices</h2>
          <p>
            View invoices, payment status and
            financial documents.
          </p>
          <a href="/supplier/invoices">
            View invoices
          </a>
        </article>

        <article style={styles.card}>
          <h2>Documents</h2>
          <p>
            Certificates, compliance documents
            and supplier records.
          </p>
          <a href="/supplier/documents">
            View documents
          </a>
        </article>

        <article style={styles.card}>
          <h2>Messages</h2>
          <p>
            Communication with TriLink operations
            and procurement teams.
          </p>
          <a href="/supplier/messages">
            View messages
          </a>
        </article>

        <article style={styles.card}>
          <h2>Security</h2>
          <p>
            Manage supplier account security.
          </p>
          <a href="/supplier/change-password">
            Change password
          </a>
        </article>

      </section>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    padding: '32px',
    fontFamily: 'Arial, sans-serif',
    background: '#f5f7fa'
  },

  center: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif'
  },

  header: {
    maxWidth: '1200px',
    margin: '0 auto 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    margin: 0
  },

  subtitle: {
    marginTop: '8px'
  },

  welcome: {
    maxWidth: '1200px',
    margin: '0 auto 24px',
    padding: '24px',
    background: '#fff',
    borderRadius: '12px'
  },

  grid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px'
  },

  card: {
    background: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow:
      '0 2px 10px rgba(0,0,0,.06)'
  },

  button: {
    padding: '10px 16px',
    border: 0,
    borderRadius: '8px',
    cursor: 'pointer'
  }
}
