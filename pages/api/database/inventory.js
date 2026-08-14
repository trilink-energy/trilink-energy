import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import { getCoreTableInventory } from '../../../lib/db/integration/inventory'

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

  const tables = getCoreTableInventory()

  return res.status(200).json({
    ok: true,
    tables,
    total: tables.length,
    generated_at: new Date().toISOString()
  })
}
