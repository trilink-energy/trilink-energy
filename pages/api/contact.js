export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');

    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
    });
  }

  try {
    let body = req.body;

    if (typeof body === 'string') {
      try {
        body = JSON.parse(body || '{}');
      } catch {
        return res.status(400).json({
          success: false,
          error: 'Invalid request body',
        });
      }
    }

    body = body || {};

    // Honeypot protection: real users should never fill this field.
    if (String(body.website || '').trim()) {
      return res.status(200).json({
        success: true,
        message: 'Contact message received successfully'
      });
    }

    const website = String(body.website || '').trim();

    if (website) {
      return res.status(200).json({
        success: true,
        message: 'Your message has been received.',
      });
    }

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email and message are required.',
      });
    }

    if (name.length > 200) {
      return res.status(400).json({
        success: false,
        error: 'Name is too long.',
      });
    }

    if (email.length > 320) {
      return res.status(400).json({
        success: false,
        error: 'Email address is too long.',
      });
    }

    if (message.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Message is too long.',
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    console.log('New TriLink contact message:', {
      name,
      email,
      message,
    });

    return res.status(200).json({
      success: true,
      message: 'Contact message received successfully.',
    });
  } catch (error) {
    console.error('Contact API error:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
}
