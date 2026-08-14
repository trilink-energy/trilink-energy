import {
  getRiskAuditFlow
} from '../../../lib/integration/risk-audit'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  return res.status(200).json({
    ok: true,
    integration: 'risk_audit',
    flow: getRiskAuditFlow()
  })
}
