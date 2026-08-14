import { useEffect, useState } from 'react'

export default function EnergyDashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/energy')
      .then(response => response.json())
      .then(result => {
        if (!result.ok) {
          throw new Error(result.error || 'Energy request failed')
        }

        setData(result)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [])

  return (
    <main style={{ padding: 32 }}>
      <h1>TriLink Energy</h1>

      {error && (
        <p>{error}</p>
      )}

      {!data && !error && (
        <p>Loading energy platform...</p>
      )}

      {data && (
        <>
          <p>Energy platform: {data.status}</p>

          <h2>Energy Types</h2>

          <ul>
            {data.types.map(type => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}
