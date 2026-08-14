import { getCEOIdentity } from '../../../lib/ceo/auth'
import { readCustomerSession } from '../../../lib/customer/auth'
import {
  buildAuthenticationStatus
} from '../../../lib/system/auth-status'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const ceo = getCEOIdentity(req)
  const customer = readCustomerSession(req)

  return res.status(200).json({
    ok: true,
    authentication: buildAuthenticationStatus({
      ceo,
      customer
    })
  })
}
