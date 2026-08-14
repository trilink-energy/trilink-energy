import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import { getDataClient } from '../../../lib/data/client'

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

  try {
    const client = getDataClient()

    const { error } = await client
      .from('customers')
      .select('id', {
        count: 'exact',
        head: true
      })

    if (error) {
      return res.status(503).json({
        ok: false,
        database: 'unreachable',
        error: 'DATABASE_QUERY_FAILED',
        detail: error.message
      })
    }

    return res.status(200).json({
      ok: true,
      database: 'reachable',
      provider: 'supabase',
      generated_at: new Date().toISOString()
    })
  } catch (error) {
    return res.status(503).json({
      ok: false,
      database: 'unreachable',
      error: 'DATABASE_CONNECTION_FAILED',
      detail: error.message
    })
  }
}
