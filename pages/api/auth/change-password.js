import { getSupabaseAdmin } from '../../../lib/supabase/server'
import {
  readCustomerSession,
  verifyCustomerPassword,
  hashPassword
} from '../../../lib/customer/auth'

function validPassword(value) {
  return (
    typeof value === 'string' &&
    value.length >= 12 &&
    value.length <= 200
  )
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  try {
    const session = readCustomerSession(req)

    if (!session) {
      return res.status(401).json({
        ok: false,
        error: 'AUTHENTICATION_REQUIRED'
      })
    }

    const {
      currentPassword,
      newPassword
    } = req.body || {}

    if (typeof currentPassword !== 'string') {
      return res.status(400).json({
        ok: false,
        error: 'CURRENT_PASSWORD_REQUIRED'
      })
    }

    if (!validPassword(newPassword)) {
      return res.status(400).json({
        ok: false,
        error: 'PASSWORD_TOO_SHORT',
        message: 'Password must contain at least 12 characters.'
      })
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        ok: false,
        error: 'PASSWORD_MUST_CHANGE'
      })
    }

    const supabase = getSupabaseAdmin()

    const {
      data: user,
      error: userError
    } = await supabase
      .from('users')
      .select(
        'id,status,password_hash,must_change_password,first_login'
      )
      .eq('id', session.id)
      .maybeSingle()

    if (
      userError ||
      !user ||
      user.status !== 'active'
    ) {
      return res.status(401).json({
        ok: false,
        error: 'AUTHENTICATION_REQUIRED'
      })
    }

    const passwordVerification = verifyCustomerPassword(
      currentPassword,
      user.password_hash
    )

    if (
      !user.password_hash ||
      !passwordVerification.valid
    ) {
      return res.status(401).json({
        ok: false,
        error: 'CURRENT_PASSWORD_INVALID'
      })
    }

    const newHash = hashPassword(newPassword)

    const {
      error: updateError
    } = await supabase
      .from('users')
      .update({
        password_hash: newHash,
        must_change_password: false,
        first_login: false,
        password_changed_at: new Date().toISOString()
      })
      .eq('id', user.id)

    if (updateError) {
      console.error(
        'Customer password update error:',
        updateError
      )

      return res.status(500).json({
        ok: false,
        error: 'PASSWORD_UPDATE_FAILED'
      })
    }

    return res.status(200).json({
      ok: true,
      password_changed: true,
      first_login: false,
      must_change_password: false
    })
  } catch (error) {
    console.error(
      'Customer password change error:',
      error
    )

    return res.status(500).json({
      ok: false,
      error: 'PASSWORD_CHANGE_FAILED'
    })
  }
}
