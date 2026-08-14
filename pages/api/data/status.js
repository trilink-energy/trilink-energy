import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import { getDataEntities } from '../../../lib/data/entities'
import { countRecords } from '../../../lib/data/services/read'

export default async function handler(req, res) {
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

  const counts = {}
  const failures = []

  for (const entity of getDataEntities()) {
    try {
      counts[entity] = await countRecords(entity)
    } catch (error) {
      failures.push({
        entity,
        error: error.message
      })
    }
  }

  return res.status(200).json({
    ok: failures.length === 0,
    database: failures.length === 0
      ? 'reachable'
      : 'partial',
    counts,
    failures,
    generated_at: new Date().toISOString()
  })
}
