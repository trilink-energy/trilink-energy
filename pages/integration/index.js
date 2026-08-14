import {
  INTEGRATION_MODULES
} from '../../lib/integration/constants'

export default function Integration() {
  return (
    <main style={{ padding: 40 }}>
      <h1>TriLink System Integration</h1>

      <p>
        Integrated business platform architecture.
      </p>

      <ul>
        {INTEGRATION_MODULES.map(module => (
          <li key={module}>{module}</li>
        ))}
      </ul>
    </main>
  )
}
