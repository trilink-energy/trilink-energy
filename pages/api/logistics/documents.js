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
      documents: []
    })
  }

  if (req.method === 'POST') {
    const body = req.body || {}

    if (!body.shipment_id || !body.type) {
      return res.status(400).json({
        ok: false,
        error: 'SHIPMENT_AND_DOCUMENT_TYPE_REQUIRED'
      })
    }

    return res.status(201).json({
      ok: true,
      document: {
        shipment_id: body.shipment_id,
        type: body.type,
        reference: body.reference || null,
        status: 'pending',
        created_at: new Date().toISOString()
      }
    })
  }

  return res.status(405).json({
    ok: false,
    error: 'METHOD_NOT_ALLOWED'
  })
}
