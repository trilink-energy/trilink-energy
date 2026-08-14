export default function IntegrationStatus({
  modules = []
}) {
  return (
    <section>
      <h2>Platform Integration</h2>

      {modules.map(module => (
        <div key={module}>
          {module}
        </div>
      ))}
    </section>
  )
}
