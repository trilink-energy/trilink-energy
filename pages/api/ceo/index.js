import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'

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
      authenticated: false,
      error: 'CEO_AUTH_REQUIRED'
    })
  }

  if (!hasCEOPermission(identity, 'ceo.dashboard.view')) {
    return res.status(403).json({
      ok: false,
      authenticated: true,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  return res.status(200).json({
    ok: true,
    authenticated: true,
    role: identity.role,
    permissions: {
      dashboard: true
    }
  })
}
