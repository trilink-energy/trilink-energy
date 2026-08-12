import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      aria-label="Footer"
      style={{
        marginTop: '4rem',
        padding: '2.5rem 1.5rem',
        borderTop: '1px solid #ddd',
        textAlign: 'center',
      }}
    >
      <strong>TriLink</strong>

      <nav
        aria-label="Footer navigation"
        style={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/business">Business</Link>
        <Link href="/solutions">Solutions</Link>
        <Link href="/services">Services</Link>
        <Link href="/partners">Partners</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <p>
        © {new Date().getFullYear()} TriLink. All rights reserved.
      </p>
    </footer>
  );
}
