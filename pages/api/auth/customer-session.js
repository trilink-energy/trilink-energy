import { readCustomerSession } from '../../../lib/customer/auth'
import { getSupabaseAdmin } from '../../../lib/supabase/server'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const session = readCustomerSession(req)

  if (!session) {
    return res.status(401).json({
      ok: false,
      authenticated: false
    })
  }

  try {
    const supabase = getSupabaseAdmin()

    const { data: user, error } = await supabase
      .from('users')
      .select(
        'id,username,email,full_name,status,first_login,must_change_password'
      )
      .eq('id', session.id)
      .maybeSingle()

    if (error || !user || user.status !== 'active') {
      return res.status(401).json({
        ok: false,
        authenticated: false
      })
    }

    return res.status(200).json({
      ok: true,
      authenticated: true,
      type: 'CUSTOMER',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name
      },
      first_login: Boolean(user.first_login),
      must_change_password: Boolean(user.must_change_password)
    })
  } catch {
    return res.status(500).json({
      ok: false,
      error: 'CUSTOMER_SESSION_FAILED'
    })
  }
}
