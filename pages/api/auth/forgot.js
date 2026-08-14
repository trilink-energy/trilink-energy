export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  /*
   * Deliberately return the same response whether or not
   * an account exists. This prevents username/email enumeration.
   */

  return res.status(200).json({
    ok: true,
    message:
      'If an account matches the supplied details, password recovery instructions will be sent.'
  })
}
