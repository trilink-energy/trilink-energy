import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function LoginPage() {
  const [account, setAccount] = useState('customer')
  const [mode, setMode] = useState('login')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submitLogin(event) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (account === 'ceo') {
        const response = await fetch('/api/ceo/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            login,
            password
          })
        })

        const data = await response.json()

        if (!response.ok || !data.ok) {
          throw new Error(
            data.error || 'CEO login failed.'
          )
        }

        window.location.href = '/ceo/dashboard'
        return
      }

      setMessage(
        'Customer authentication is being connected to the customer account system.'
      )
    } catch (error) {
      setMessage(error.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  async function submitRecovery(event) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login
        })
      })

      const data = await response.json()

      setMessage(
        data.message ||
          'If the account exists, recovery instructions will be sent.'
      )
    } catch {
      setMessage(
        'Recovery request could not be completed.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>TriLink Global — Secure Access</title>
        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>

      <main style={styles.page}>
        <section style={styles.card}>

          <div style={styles.brand}>
            TRILINK GLOBAL
          </div>

          <div style={styles.badge}>
            SECURE ACCESS CENTRE
          </div>

          <h1 style={styles.title}>
            Welcome back
          </h1>

          <p style={styles.subtitle}>
            Sign in to your TriLink Global account.
          </p>

          <div style={styles.tabs}>
            <button
              type="button"
              onClick={() => {
                setAccount('customer')
                setMode('login')
                setMessage('')
              }}
              style={{
                ...styles.tab,
                ...(account === 'customer'
                  ? styles.activeTab
                  : {})
              }}
            >
              Customer Login
            </button>

            <button
              type="button"
              onClick={() => {
                setAccount('ceo')
                setMode('login')
                setMessage('')
              }}
              style={{
                ...styles.tab,
                ...(account === 'ceo'
                  ? styles.activeTab
                  : {})
              }}
            >
              CEO Login
            </button>
          </div>

          {mode === 'login' ? (
            <form onSubmit={submitLogin}>

              <label style={styles.label}>
                {account === 'ceo'
                  ? 'CEO Username'
                  : 'Email or Username'}
              </label>

              <input
                value={login}
                onChange={event =>
                  setLogin(event.target.value)
                }
                autoComplete="username"
                required
                style={styles.input}
              />

              <label style={styles.label}>
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={event =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                required
                style={styles.input}
              />

              <button
                disabled={loading}
                style={styles.loginButton}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div style={styles.recovery}>
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot-password')
                    setMessage('')
                  }}
                  style={styles.linkButton}
                >
                  Forgot username or password?
                </button>
              </div>

            </form>
          ) : (
            <form onSubmit={submitRecovery}>

              <h2 style={styles.formTitle}>
                Account Recovery
              </h2>

              <p style={styles.text}>
                Enter your registered email or username.
                For security, we will not reveal whether
                an account exists.
              </p>

              <label style={styles.label}>
                Email or Username
              </label>

              <input
                value={login}
                onChange={event =>
                  setLogin(event.target.value)
                }
                autoComplete="username"
                required
                style={styles.input}
              />

              <button
                disabled={loading}
                style={styles.loginButton}
              >
                {loading
                  ? 'Processing...'
                  : 'Continue Recovery'}
              </button>

              <div style={styles.recovery}>
                <button
                  type="button"
                  onClick={() => {
                    setMode('login')
                    setMessage('')
                  }}
                  style={styles.linkButton}
                >
                  ← Back to login
                </button>
              </div>

            </form>
          )}

          {message && (
            <div style={styles.message}>
              {message}
            </div>
          )}

          <div style={styles.footer}>
            <Link href="/">
              Return to TriLink Global
            </Link>
          </div>

          <div style={styles.security}>
            🔒 Secure authentication
          </div>

        </section>
      </main>
    </>
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
    fontFamily:
      'Inter, ui-sans-serif, system-ui, sans-serif'
  },

  card: {
    width: '100%',
    maxWidth: '520px',
    padding: '40px',
    borderRadius: '24px',
    background: '#0d1b2d',
    border:
      '1px solid rgba(255,255,255,.10)',
    boxShadow:
      '0 24px 80px rgba(0,0,0,.35)'
  },

  brand: {
    fontSize: '13px',
    fontWeight: 900,
    letterSpacing: '.18em'
  },

  badge: {
    marginTop: '22px',
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '.14em',
    opacity: .5
  },

  title: {
    fontSize: '38px',
    margin: '12px 0 8px'
  },

  subtitle: {
    opacity: .65,
    lineHeight: 1.6
  },

  tabs: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    margin: '30px 0'
  },

  tab: {
    padding: '13px',
    borderRadius: '10px',
    border:
      '1px solid rgba(255,255,255,.08)',
    background: 'rgba(255,255,255,.04)',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 700
  },

  activeTab: {
    background: 'rgba(255,255,255,.12)',
    border:
      '1px solid rgba(255,255,255,.20)'
  },

  label: {
    display: 'block',
    margin: '18px 0 8px',
    fontSize: '13px',
    fontWeight: 700,
    opacity: .75
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '14px 15px',
    borderRadius: '10px',
    border:
      '1px solid rgba(255,255,255,.12)',
    background: '#07111f',
    color: '#fff',
    outline: 'none',
    fontSize: '15px'
  },

  loginButton: {
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

  recovery: {
    textAlign: 'center',
    marginTop: '18px'
  },

  linkButton: {
    border: 0,
    background: 'none',
    color: '#fff',
    opacity: .7,
    cursor: 'pointer',
    textDecoration: 'underline'
  },

  formTitle: {
    marginTop: '10px'
  },

  text: {
    lineHeight: 1.6,
    opacity: .65
  },

  message: {
    marginTop: '20px',
    padding: '14px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,.05)',
    lineHeight: 1.5
  },

  footer: {
    marginTop: '30px',
    textAlign: 'center',
    opacity: .65,
    fontSize: '13px'
  },

  security: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '12px',
    opacity: .45
  }
}
