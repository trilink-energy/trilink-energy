import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import {
  validEnergyType,
  validProjectStatus,
  validEnergyPriority,
  validEnergyReference
} from '../../../lib/energy/validation'

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
      ? 'ceo.energy.view'
      : 'ceo.energy.control'

  if (!hasCEOPermission(identity, permission)) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      projects: []
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

  if (!validEnergyReference(body.reference)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_ENERGY_REFERENCE'
    })
  }

  if (body.type && !validEnergyType(body.type)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_ENERGY_TYPE'
    })
  }

  if (
    body.status &&
    !validProjectStatus(body.status)
  ) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_PROJECT_STATUS'
    })
  }

  if (
    body.priority &&
    !validEnergyPriority(body.priority)
  ) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_ENERGY_PRIORITY'
    })
  }

  return res.status(201).json({
    ok: true,
    project: {
      reference: body.reference.trim(),
      type: body.type || 'other',
      status: body.status || 'planning',
      priority: body.priority || 'standard',
      location: body.location || null,
      capacity: body.capacity || null
    }
  })
}
