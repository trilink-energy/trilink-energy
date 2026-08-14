import React from 'react'

export default function CEOLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{ padding: '20px' }}>
        <strong>TriLink CEO</strong>
      </header>

      <main>
        {children}
      </main>
    </div>
  )
}
