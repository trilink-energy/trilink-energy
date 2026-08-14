import { getCEOIdentity } from '../../../lib/ceo/auth'
import { readCustomerSession } from '../../../lib/customer/auth'

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
    authentication: {
      ceo: Boolean(ceo),
      customer: Boolean(customer)
    },
    generated_at: new Date().toISOString()
  })
}
