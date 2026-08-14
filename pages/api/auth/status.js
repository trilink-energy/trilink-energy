import { getCEOIdentity } from '../../../lib/ceo/auth'
import { getSupabaseAdmin } from '../../../lib/supabase/server'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  try {
    const ceo = getCEOIdentity(req)

    if (ceo) {
      return res.status(200).json({
        ok: true,
        authenticated: true,
        account_type: 'CEO',
        role: ceo.role
      })
    }

    return res.status(200).json({
      ok: true,
      authenticated: false
    })
  } catch {
    return res.status(500).json({
      ok: false,
      error: 'AUTH_STATUS_FAILED'
    })
  }
}
