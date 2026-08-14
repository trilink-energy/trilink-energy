import { clearCustomerCookie } from '../../../lib/customer/auth'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  clearCustomerCookie(res)

  return res.status(200).json({
    ok: true,
    authenticated: false
  })
}
