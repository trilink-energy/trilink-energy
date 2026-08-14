import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import {
  ROUTE_STATUSES,
  validRouteStatus
} from '../../../lib/logistics/constants'
import {
  requiredString,
  optionalString
} from '../../../lib/logistics/validation'
import { generateRouteReference } from '../../../lib/logistics/reference'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      error: 'CEO_AUTH_REQUIRED'
    })
  }

  if (req.method === 'GET') {
    if (!hasCEOPermission(identity, 'ceo.logistics.view')) {
      return res.status(403).json({
        ok: false,
        error: 'CEO_PERMISSION_REQUIRED'
      })
    }

    return res.status(200).json({
      ok: true,
      routes: [],
      statuses: ROUTE_STATUSES
    })
  }

  if (req.method === 'POST') {
    if (!hasCEOPermission(identity, 'ceo.logistics.control')) {
      return res.status(403).json({
        ok: false,
        error: 'CEO_PERMISSION_REQUIRED'
      })
    }

    const body = req.body || {}

    if (
      !requiredString(body.origin) ||
      !requiredString(body.destination)
    ) {
      return res.status(400).json({
        ok: false,
        error: 'ORIGIN_AND_DESTINATION_REQUIRED'
      })
    }

    const route = {
      reference: generateRouteReference(),
      origin: body.origin.trim(),
      destination: body.destination.trim(),
      corridor: body.corridor || null,
      status: 'planned',
      created_at: new Date().toISOString()
    }

    return res.status(201).json({
      ok: true,
      route
    })
  }

  return res.status(405).json({
    ok: false,
    error: 'METHOD_NOT_ALLOWED'
  })
}
