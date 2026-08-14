import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function CEOLogin() {
  const router = useRouter()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault()

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/ceo/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login,
          password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Authentication failed'
        )
      }

      await router.push('/ceo/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>TriLink CEO Login</title>
        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>

      <main style={styles.page}>
        <form
          onSubmit={submit}
          style={styles.card}
        >
          <div style={styles.eyebrow}>
            TRILINK GLOBAL
          </div>

          <h1 style={styles.title}>
            CEO Login
          </h1>

          <p style={styles.subtitle}>
            Founder / Chairman / CEO
          </p>

          <label style={styles.label}>
            CEO Login
          </label>

          <input
            value={login}
            onChange={e => setLogin(e.target.value)}
            autoComplete="username"
            style={styles.input}
            required
          />

          <label style={styles.label}>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            style={styles.input}
            required
          />

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'AUTHENTICATING...' : 'ENTER CEO DASHBOARD'}
          </button>

          <p style={styles.security}>
            Protected executive area. Authentication is
            server-side and the password is never stored
            in the browser.
          </p>
        </form>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, sans-serif'
  },

  card: {
    width: '100%',
    maxWidth: '440px',
    padding: '36px',
    borderRadius: '22px',
    background: '#0d1b2d',
    border: '1px solid rgba(255,255,255,.10)'
  },

  eyebrow: {
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '.16em',
    opacity: .55
  },

  title: {
    fontSize: '36px',
    margin: '12px 0 4px'
  },

  subtitle: {
    margin: '0 0 28px',
    opacity: .6
  },

  label: {
    display: 'block',
    fontSize: '13px',
    margin: '16px 0 7px'
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '13px 14px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,.14)',
    background: '#07111f',
    color: '#fff',
    outline: 'none'
  },

  button: {
    width: '100%',
    marginTop: '22px',
    padding: '14px',
    border: 0,
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 800
  },

  error: {
    marginTop: '16px',
    padding: '12px',
    borderRadius: '9px',
    background: 'rgba(255,255,255,.06)',
    fontSize: '13px'
  },

  security: {
    marginTop: '20px',
    fontSize: '11px',
    lineHeight: 1.6,
    opacity: .45
  }
}
