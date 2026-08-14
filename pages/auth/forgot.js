import { useState } from 'react'

export default function ForgotPage() {
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setMessage('')
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: value,
          username: value
        })
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error(
          data.error || 'Unable to process request.'
        )
      }

      setMessage(
        data.message ||
        'If the account exists, recovery instructions will be provided.'
      )
    } catch (err) {
      setError(err.message || 'Unable to process request.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.brand}>TRILINK GLOBAL</div>

        <h1 style={styles.title}>
          Account Recovery
        </h1>

        <p style={styles.text}>
          Enter your email address or username to begin
          account recovery.
        </p>

        <form onSubmit={submit}>
          <label style={styles.label}>
            Email or Username
          </label>

          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            required
            autoComplete="username"
            style={styles.input}
            placeholder="Enter email or username"
          />

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          {message && (
            <div style={styles.success}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'PROCESSING...' : 'CONTINUE'}
          </button>
        </form>

        <div style={styles.links}>
          <a href="/auth/login">
            ← Back to Login
          </a>
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
    border: '1px solid rgba(255,255,255,.10)'
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

  text: {
    lineHeight: 1.6,
    opacity: .65,
    marginBottom: '28px'
  },

  label: {
    display: 'block',
    marginBottom: '8px',
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
    color: '#fff'
  },

  button: {
    width: '100%',
    marginTop: '22px',
    padding: '15px',
    border: 0,
    borderRadius: '10px',
    background: '#fff',
    color: '#07111f',
    fontWeight: 900
  },

  error: {
    marginTop: '16px',
    padding: '12px',
    borderRadius: '10px',
    background: 'rgba(255,80,80,.12)',
    color: '#ffb4b4'
  },

  success: {
    marginTop: '16px',
    padding: '12px',
    borderRadius: '10px',
    background: 'rgba(80,200,120,.12)',
    color: '#a7f3c0'
  },

  links: {
    marginTop: '24px',
    textAlign: 'center'
  }
}
