export default function Contact() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Contact TriLink</h1>

      <p>
        Contact our team regarding trade, logistics,
        energy and commercial opportunities.
      </p>

      <form
        method="POST"
        action="/api/contact"
        style={{
          maxWidth: 600,
          display: 'grid',
          gap: 16
        }}
      >
        <input
          name="name"
          placeholder="Your name"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Your email"
          required
        />

        <textarea
          name="message"
          placeholder="Message"
          rows="6"
          required
        />

        <button type="submit">
          Send message
        </button>
      </form>
    </main>
  )
}
