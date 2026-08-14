import {
  PLATFORM_MODULES
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

  const modules = {}

  for (const module of PLATFORM_MODULES) {
    modules[module] = {
      status: 'available'
    }
  }

  return res.status(200).json({
    ok: true,
    platform: 'TriLink',
    status: 'operational',
    modules,
    generated_at: new Date().toISOString()
  })
}
