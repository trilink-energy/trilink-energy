import Link from 'next/link'
import { PUBLIC_NAVIGATION } from '../../lib/navigation/constants'

export default function PublicNavigation() {
  return (
    <nav
      aria-label="Public navigation"
      style={{
        display: 'flex',
        gap: 20,
        padding: 20,
        borderBottom: '1px solid #ddd'
      }}
    >
      {PUBLIC_NAVIGATION.map(item => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
