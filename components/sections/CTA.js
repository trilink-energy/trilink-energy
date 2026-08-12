import Link from 'next/link';

export default function CTA() {
  return (
    <section className="cta-section">
      <div>
        <span className="eyebrow">LET'S CONNECT</span>
        <h2>Have an opportunity worth discussing?</h2>
        <p>
          Talk to TriLink about a business enquiry, partnership, trade
          opportunity or technology requirement.
        </p>
      </div>

      <Link href="/contact" className="button button-primary">
        Contact TriLink
      </Link>
    </section>
  );
}
