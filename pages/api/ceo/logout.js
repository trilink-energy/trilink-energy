import {
  clearCEOAuthenticationCookie
} from '../../../lib/ceo/auth'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  clearCEOAuthenticationCookie(res)

  return res.status(200).json({
    ok: true,
    authenticated: false
  })
}
