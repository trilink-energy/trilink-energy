import Link from 'next/link'
import { ADMIN_NAVIGATION } from '../../lib/navigation/constants'

export default function AdminNavigation() {
  return (
    <nav
      aria-label="Administration navigation"
      style={{
        display: 'flex',
        gap: 16,
        padding: 20,
        borderBottom: '1px solid #ddd'
      }}
    >
      {ADMIN_NAVIGATION.map(item => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
