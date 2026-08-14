import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      error: 'CEO_AUTH_REQUIRED'
    })
  }

  const permission =
    req.method === 'GET'
      ? 'ceo.logistics.view'
      : 'ceo.logistics.control'

  if (!hasCEOPermission(identity, permission)) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      carriers: []
    })
  }

  if (req.method === 'POST') {
    const body = req.body || {}

    if (
      typeof body.name !== 'string' ||
      !body.name.trim()
    ) {
      return res.status(400).json({
        ok: false,
        error: 'CARRIER_NAME_REQUIRED'
      })
    }

    return res.status(201).json({
      ok: true,
      carrier: {
        name: body.name.trim(),
        contact: body.contact || null,
        status: 'active',
        created_at: new Date().toISOString()
      }
    })
  }

  return res.status(405).json({
    ok: false,
    error: 'METHOD_NOT_ALLOWED'
  })
}
