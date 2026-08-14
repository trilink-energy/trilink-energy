import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import {
  validApprovalAction,
  validApprovalReference
} from '../../../lib/approvals/validation'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      error: 'CEO_AUTHENTICATION_REQUIRED'
    })
  }

  if (!hasCEOPermission(identity, 'ceo.approvals.execute')) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])

    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const body = req.body || {}

  if (!validApprovalReference(body.reference)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_APPROVAL_REFERENCE'
    })
  }

  if (!validApprovalAction(body.action)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_APPROVAL_ACTION'
    })
  }

  const status =
    body.action === 'approve'
      ? 'approved'
      : body.action === 'reject'
        ? 'rejected'
        : 'cancelled'

  return res.status(200).json({
    ok: true,
    approval: {
      reference: body.reference.trim(),
      status,
      decided_by: identity.role,
      decided_at: new Date().toISOString()
    }
  })
}
