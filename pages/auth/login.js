import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState('customer')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint =
        mode === 'ceo'
          ? '/api/ceo/login'
          : '/api/auth/customer-login'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login,
          username: login,
          email: login,
          password
        })
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Authentication failed.')
      }

      if (mode === 'ceo') {
        if (
          data.first_login ||
          data.must_change_password ||
          data.require_password_change
        ) {
          router.push('/auth/change-password?first_login=1')
          return
        }

        router.push('/ceo/dashboard')
        return
      }

      router.push('/business')
    } catch (err) {
      setError(err.message || 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.brand}>TRILINK GLOBAL</div>

        <h1 style={styles.title}>Secure Access Portal</h1>

        <p style={styles.subtitle}>
          Sign in to your TriLink account.
        </p>

        <div style={styles.tabs}>
          <button
            type="button"
            onClick={() => setMode('customer')}
            style={{
              ...styles.tab,
              ...(mode === 'customer' ? styles.activeTab : {})
            }}
          >
            Customer Login
          </button>

          <button
            type="button"
            onClick={() => setMode('ceo')}
            style={{
              ...styles.tab,
              ...(mode === 'ceo' ? styles.activeTab : {})
            }}
          >
            CEO Login
          </button>
        </div>

        <form onSubmit={submit}>
          <label style={styles.label}>
            {mode === 'ceo' ? 'CEO Username' : 'Email / Username'}
          </label>

          <input
            value={login}
            onChange={e => setLogin(e.target.value)}
            autoComplete="username"
            required
            style={styles.input}
            placeholder={
              mode === 'ceo'
                ? 'Enter CEO username'
                : 'Enter email or username'
            }
          />

          <label style={styles.label}>Password</label>

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            style={styles.input}
            placeholder="Enter password"
          />

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.submit}
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <div style={styles.links}>
          <a href="/auth/forgot">
            Forgot username or password?
          </a>
        </div>

        <div style={styles.security}>
          <strong>SECURE ACCESS</strong>
          <span>Protected TriLink authentication system</span>
        </div>
      </section>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#07111f',
    color: '#f7fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
  },

  card: {
    width: '100%',
    maxWidth: '520px',
    padding: '40px',
    borderRadius: '24px',
    background: '#0d1b2d',
    border: '1px solid rgba(255,255,255,.10)',
    boxShadow: '0 25px 80px rgba(0,0,0,.35)'
  },

  brand: {
    fontSize: '12px',
    fontWeight: 900,
    letterSpacing: '.18em',
    opacity: .65
  },

  title: {
    fontSize: '34px',
    margin: '14px 0 8px'
  },

  subtitle: {
    opacity: .65,
    marginBottom: '28px'
  },

  tabs: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginBottom: '28px'
  },

  tab: {
    padding: '13px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,.10)',
    background: 'rgba(255,255,255,.04)',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 700
  },

  activeTab: {
    background: '#fff',
    color: '#07111f'
  },

  label: {
    display: 'block',
    margin: '16px 0 8px',
    fontSize: '13px',
    fontWeight: 700
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,.12)',
    background: '#07111f',
    color: '#fff',
    outline: 'none'
  },

  submit: {
    width: '100%',
    marginTop: '24px',
    padding: '15px',
    border: 0,
    borderRadius: '10px',
    background: '#fff',
    color: '#07111f',
    fontWeight: 900,
    cursor: 'pointer'
  },

  error: {
    marginTop: '16px',
    padding: '12px',
    borderRadius: '10px',
    background: 'rgba(255,80,80,.12)',
    border: '1px solid rgba(255,80,80,.25)',
    color: '#ffb4b4',
    fontSize: '13px'
  },

  links: {
    marginTop: '22px',
    textAlign: 'center'
  },

  security: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginTop: '30px',
    padding: '16px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,.04)',
    fontSize: '12px',
    opacity: .7
  }
}
