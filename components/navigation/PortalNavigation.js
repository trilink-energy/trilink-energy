import Link from 'next/link'
import { PORTAL_NAVIGATION } from '../../lib/navigation/constants'

export default function PortalNavigation() {
  return (
    <nav
      aria-label="Portal navigation"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        padding: 20,
        borderBottom: '1px solid #ddd'
      }}
    >
      {PORTAL_NAVIGATION.map(item => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
