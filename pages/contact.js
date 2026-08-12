import Head from 'next/head';
import { useState } from 'react';

const productionUrl = 'https://trilink.platformsify.workers.dev';

export default function Contact() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus('');
    setLoading(true);

    const form = new FormData(event.currentTarget);

    const data = {
      name: String(form.get('name') || '').trim(),
      email: String(form.get('email') || '').trim(),
      message: String(form.get('message') || '').trim(),
      website: String(form.get('website') || '').trim(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        setStatus('Your message has been received.');
        event.currentTarget.reset();
      } else {
        setStatus(
          result.error ||
            'Unable to send your message. Please try again.'
        );
      }
    } catch (error) {
      console.error('Contact form error:', error);

      setStatus(
        'Unable to connect to the contact service. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact TriLink | Business Enquiries & Partnerships</title>

        <meta
          name="description"
          content="Contact TriLink about business enquiries, digital projects, technology solutions, trade opportunities and partnerships."
        />

        <link
          rel="canonical"
          href={`${productionUrl}/contact`}
        />

        <meta
          property="og:title"
          content="Contact TriLink"
        />

        <meta
          property="og:description"
          content="Contact TriLink about business, technology, trade and partnership opportunities."
        />

        <meta
          property="og:url"
          content={`${productionUrl}/contact`}
        />

        <meta property="og:type" content="website" />
      </Head>

      <main id="main-content">
        <section
          style={{
            padding: '5rem 2rem',
            background: '#0f172a',
            color: '#fff',
          }}
        >
          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            <p
              style={{
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 700,
              }}
            >
              Get in touch
            </p>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                lineHeight: 1.05,
              }}
            >
              Start a conversation with TriLink.
            </h1>

            <p
              style={{
                fontSize: '1.2rem',
                lineHeight: 1.8,
                color: '#cbd5e1',
                maxWidth: '750px',
              }}
            >
              Tell us about your business requirement, project,
              partnership opportunity or technology challenge.
            </p>
          </div>
        </section>

        <section
          style={{
            padding: '5rem 2rem',
          }}
        >
          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            <form onSubmit={handleSubmit}>
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  overflow: 'hidden',
                }}
              >
                <label htmlFor="website">
                  Website
                </label>

                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="name"
                  style={{
                    display: 'block',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                  }}
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={200}
                  autoComplete="name"
                  placeholder="Your name"
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                  }}
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={320}
                  autoComplete="email"
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  htmlFor="message"
                  style={{
                    display: 'block',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                  }}
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={5000}
                  rows={8}
                  placeholder="Tell us how we can help."
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '0.9rem 1.5rem',
                  border: 0,
                  borderRadius: '8px',
                  background: '#0f172a',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: loading ? 'wait' : 'pointer',
                }}
              >
                {loading ? 'Sending…' : 'Send Message'}
              </button>

              <p
                role="status"
                aria-live="polite"
                style={{
                  marginTop: '1rem',
                  minHeight: '1.5rem',
                }}
              >
                {status}
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
