import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import {
  validMode,
  validPriority,
  validShipmentReference
} from '../../../lib/logistics/validation'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      error: 'CEO_AUTHENTICATION_REQUIRED'
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
      shipments: []
    })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const body = req.body || {}

  if (!validShipmentReference(body.reference)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_SHIPMENT_REFERENCE'
    })
  }

  if (body.mode && !validMode(body.mode)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_SHIPMENT_MODE'
    })
  }

  if (body.priority && !validPriority(body.priority)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_SHIPMENT_PRIORITY'
    })
  }

  return res.status(201).json({
    ok: true,
    status: 'draft',
    shipment: {
      reference: body.reference.trim(),
      mode: body.mode || 'road',
      priority: body.priority || 'standard',
      origin: body.origin || null,
      destination: body.destination || null
    }
  })
}
