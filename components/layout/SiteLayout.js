export default function SiteLayout({
  children,
  navigation = null
}) {
  return (
    <>
      {navigation}

      <main
        style={{
          minHeight: '70vh',
          padding: 24
        }}
      >
        {children}
      </main>

      <footer
        style={{
          padding: 20,
          borderTop: '1px solid #ddd'
        }}
      >
        <p>
          TriLink — Integrated Trade, Logistics,
          Energy and Technology Platform
        </p>
      </footer>
    </>
  )
}
