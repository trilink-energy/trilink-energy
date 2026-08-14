import { useState } from 'react'
import { useRouter } from 'next/router'

export default function ChangePassword() {
  const router = useRouter()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault()

    setMessage('')

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        '/api/auth/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            currentPassword,
            newPassword
          })
        }
      )

      const data = await response.json()

      if (!response.ok || !data.ok) {
        setMessage(
          data.message ||
          data.error ||
          'Password change failed.'
        )
        return
      }

      router.push('/ceo/dashboard')
    } catch {
      setMessage(
        'Unable to connect to the authentication service.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>

        <div style={styles.badge}>
          FIRST LOGIN SECURITY
        </div>

        <h1 style={styles.title}>
          Change your password
        </h1>

        <p style={styles.text}>
          For security, you must create a new password
          before continuing.
        </p>

        <form onSubmit={submit}>

          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={e =>
              setCurrentPassword(e.target.value)
            }
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={e =>
              setNewPassword(e.target.value)
            }
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={e =>
              setConfirmPassword(e.target.value)
            }
            required
            style={styles.input}
          />

          <p style={styles.policy}>
            Minimum 12 characters, including uppercase,
            lowercase and a number.
          </p>

          {message && (
            <div style={styles.error}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading
              ? 'CHANGING PASSWORD...'
              : 'CHANGE PASSWORD'}
          </button>

        </form>

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
    fontFamily:
      'Inter, ui-sans-serif, system-ui, sans-serif'
  },

  card: {
    width: '100%',
    maxWidth: '520px',
    padding: '40px',
    borderRadius: '24px',
    background: '#0d1b2d',
    border: '1px solid rgba(255,255,255,.10)'
  },

  badge: {
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '0.16em',
    opacity: 0.55
  },

  title: {
    fontSize: '32px',
    margin: '14px 0'
  },

  text: {
    lineHeight: 1.6,
    opacity: 0.65,
    marginBottom: '28px'
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '14px',
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,.12)',
    background: '#07111f',
    color: '#fff'
  },

  policy: {
    fontSize: '11px',
    opacity: 0.5,
    lineHeight: 1.5
  },

  error: {
    marginTop: '16px',
    padding: '12px',
    borderRadius: '9px',
    background: 'rgba(255,80,80,.10)',
    color: '#ffb4b4',
    fontSize: '13px'
  },

  button: {
    width: '100%',
    marginTop: '20px',
    padding: '15px',
    border: 0,
    borderRadius: '10px',
    background: '#fff',
    color: '#07111f',
    fontWeight: 900
  }
}
