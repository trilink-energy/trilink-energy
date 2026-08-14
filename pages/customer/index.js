import { useEffect, useState } from 'react'

export default function CustomerPortal() {
  const [loading, setLoading] = useState(true)
  const [customer, setCustomer] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/auth/customer-session', {
      credentials: 'include'
    })
      .then(async response => {
        const data = await response.json()

        if (!response.ok || !data?.authenticated) {
          window.location.href = '/customer/login'
          return
        }

        setCustomer(data.customer || data.session || null)
        setLoading(false)
      })
      .catch(() => {
        setError('Unable to load customer session.')
        setLoading(false)
      })
  }, [])

  async function logout() {
    await fetch('/api/auth/customer-logout', {
      method: 'POST',
      credentials: 'include'
    })

    window.location.href = '/customer/login'
  }

  if (loading) {
    return <main style={styles.center}>Loading customer portal...</main>
  }

  if (error) {
    return <main style={styles.center}>{error}</main>
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>TriLink Customer Portal</h1>
          <p style={styles.subtitle}>
            Secure customer account
          </p>
        </div>

        <button onClick={logout} style={styles.button}>
          Sign out
        </button>
      </header>

      <section style={styles.grid}>
        <article style={styles.card}>
          <h2>Account</h2>
          <p>
            {customer?.full_name ||
              customer?.name ||
              customer?.email ||
              'Customer'}
          </p>
        </article>

        <article style={styles.card}>
          <h2>Orders</h2>
          <p>Orders and trade activity will appear here.</p>
        </article>

        <article style={styles.card}>
          <h2>Shipments</h2>
          <p>Shipment tracking will appear here.</p>
        </article>

        <article style={styles.card}>
          <h2>Invoices</h2>
          <p>Invoices and payment information will appear here.</p>
        </article>

        <article style={styles.card}>
          <h2>Support</h2>
          <p>Customer support and service requests.</p>
        </article>

        <article style={styles.card}>
          <h2>Security</h2>
          <a href="/customer/change-password">
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
  grid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px'
  },
  card: {
    background: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,.06)'
  },
  button: {
    padding: '10px 16px',
    border: 0,
    borderRadius: '8px',
    cursor: 'pointer'
  }
}
