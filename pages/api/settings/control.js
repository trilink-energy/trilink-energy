import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import {
  validSettingGroup,
  validAdminAction
} from '../../../lib/settings/constants'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      error: 'CEO_AUTHENTICATION_REQUIRED'
    })
  }

  if (!hasCEOPermission(identity, 'ceo.settings.control')) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const body = req.body || {}

  if (!validSettingGroup(body.group)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_SETTING_GROUP'
    })
  }

  if (!validAdminAction(body.action)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_ADMIN_ACTION'
    })
  }

  return res.status(200).json({
    ok: true,
    group: body.group,
    action: body.action,
    status: 'accepted',
    timestamp: new Date().toISOString()
  })
}
