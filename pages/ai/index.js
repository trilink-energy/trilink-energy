import { useEffect, useState } from 'react'

export default function AIDashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/ai')
      .then(response => response.json())
      .then(result => {
        if (!result.ok) {
          throw new Error(result.error || 'AI request failed')
        }

        setData(result)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [])

  return (
    <main style={{ padding: 32 }}>
      <h1>TriLink AI Platform</h1>

      {error && <p>{error}</p>}

      {!data && !error && (
        <p>Loading AI platform...</p>
      )}

      {data && (
        <>
          <p>AI platform: {data.status}</p>

          <h2>Agents</h2>
          <ul>
            {data.agents.map(status => (
              <li key={status}>{status}</li>
            ))}
          </ul>

          <h2>Tasks</h2>
          <ul>
            {data.tasks.map(status => (
              <li key={status}>{status}</li>
            ))}
          </ul>

          <h2>Actions</h2>
          <ul>
            {data.actions.map(status => (
              <li key={status}>{status}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}
