import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/business', label: 'Business' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/services', label: 'Services' },
    { href: '/partners', label: 'Partners' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      aria-label="Main navigation"
      style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <Link
        href="/"
        style={{
          fontWeight: 800,
          textDecoration: 'none',
          fontSize: '1.25rem',
        }}
      >
        TriLink
      </Link>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {links.map((link) => {
          const active =
            router.pathname === link.href ||
            (link.href !== '/' &&
              router.pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              style={{
                textDecoration: active ? 'underline' : 'none',
                fontWeight: active ? 700 : 400,
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
