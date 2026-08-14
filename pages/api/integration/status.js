import {
  PLATFORM_MODULES,
  INTEGRATION_LINKS
} from '../../../lib/integration/constants'
import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

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
      error: 'CEO_AUTHENTICATION_REQUIRED'
    })
  }

  if (!hasCEOPermission(identity, 'ceo.dashboard.view')) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  const integrations = INTEGRATION_LINKS.map(
    ([from, to]) => ({
      from,
      to,
      status: 'configured'
    })
  )

  return res.status(200).json({
    ok: true,
    modules: PLATFORM_MODULES,
    integrations,
    total_integrations: integrations.length,
    generated_at: new Date().toISOString()
  })
}
