import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import {
  ENERGY_STATUSES,
  ENERGY_TYPES,
  validEnergyStatus,
  validEnergyType
} from '../../../lib/energy/constants'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      error: 'CEO_AUTHENTICATION_REQUIRED'
    })
  }

  if (!hasCEOPermission(identity, 'ceo.energy.control')) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      operations: [],
      statuses: ENERGY_STATUSES,
      types: ENERGY_TYPES
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const body = req.body || {}

  const type = body.type || 'other'
  const status = body.status || 'draft'

  if (!validEnergyType(type)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_ENERGY_TYPE'
    })
  }

  if (!validEnergyStatus(status)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_ENERGY_STATUS'
    })
  }

  return res.status(201).json({
    ok: true,
    operation: {
      id: `energy-${Date.now()}`,
      type,
      status,
      created_at: new Date().toISOString()
    }
  })
}
