import { PUBLIC_SERVICES } from '../lib/public/constants'

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      padding: 40
    }}>
      <header>
        <h1>TriLink</h1>
        <p>Trade. Logistics. Energy. Technology.</p>
      </header>

      <section style={{ marginTop: 60 }}>
        <h2>Connecting markets. Building opportunities.</h2>

        <p>
          TriLink is a technology-driven platform designed to
          connect trade, logistics, energy and business services.
        </p>
      </section>

      <section style={{ marginTop: 50 }}>
        <h2>Our Platforms</h2>

        <div>
          {PUBLIC_SERVICES.map(service => (
            <article
              key={service.key}
              style={{
                marginBottom: 24,
                padding: 20,
                border: '1px solid #ddd',
                borderRadius: 12
              }}
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: 80 }}>
        <p>© {new Date().getFullYear()} TriLink. All rights reserved.</p>
      </footer>
    </main>
  )
}
