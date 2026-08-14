import {
  getCEOIdentity
} from '../../../lib/ceo/auth'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      authenticated: false
    })
  }

  return res.status(200).json({
    ok: true,
    ...identity
  })
}
