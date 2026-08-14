import { getSupabaseAdmin } from '../../../lib/supabase/server'
import {
  hashPassword,
  generateTemporaryPassword
} from '../../../lib/customer/auth'
import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      error: 'CEO_AUTHENTICATION_REQUIRED'
    })
  }

  if (!hasCEOPermission(identity, 'ceo.customers.control')) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  try {
    const {
      email,
      full_name
    } = req.body || {}

    const normalizedEmail = String(email || '')
      .trim()
      .toLowerCase()

    if (!normalizedEmail) {
      return res.status(400).json({
        ok: false,
        error: 'EMAIL_REQUIRED'
      })
    }

    const supabase = getSupabaseAdmin()

    const { data: existing, error: lookupError } = await supabase
      .from('users')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (lookupError) {
      return res.status(500).json({
        ok: false,
        error: 'DATABASE_QUERY_FAILED'
      })
    }

    if (existing) {
      return res.status(409).json({
        ok: false,
        error: 'CUSTOMER_ALREADY_EXISTS'
      })
    }

    const temporaryPassword = generateTemporaryPassword()
    const passwordHash = hashPassword(temporaryPassword)

    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email: normalizedEmail,
        full_name: full_name || null,
        status: 'active',
        password_hash: passwordHash,
        must_change_password: true,
        first_login: true
      })
      .select(
        'id,email,full_name,status,username,must_change_password,first_login,created_at'
      )
      .single()

    if (error) {
      console.error('Customer insert error:', error)

      return res.status(500).json({
        ok: false,
        error: 'CUSTOMER_PROVISIONING_FAILED'
      })
    }

    /*
     * Never return the temporary password in the HTTP response.
     *
     * The provisioning workflow must deliver the temporary
     * credential through a secure out-of-band mechanism.
     */
    return res.status(201).json({
      ok: true,
      customer: user,
      authentication: {
        provisioning: 'ACCOUNT_CREATED',
        first_login_required: true
      },
      temporary_password_issued: true,
      temporary_password_delivery: 'OUT_OF_BAND_REQUIRED'
    })
  } catch (error) {
    console.error('Customer provisioning error:', error)

    return res.status(500).json({
      ok: false,
      error: 'CUSTOMER_PROVISIONING_FAILED'
    })
  }
}
