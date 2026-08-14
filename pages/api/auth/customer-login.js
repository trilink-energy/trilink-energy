import { getSupabaseAdmin } from '../../../lib/supabase/server'
import {
  createCustomerSession,
  verifyCustomerPassword,
  hashPassword
} from '../../../lib/customer/auth'

import {
  getClientIdentifier,
  hashClientIdentifier
} from '../../../lib/security/rate-limit'

import {
  checkAuthRateLimit,
  recordAuthFailure,
  clearAuthRateLimit
} from '../../../lib/security/rate-limit-db'


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const email = String(req.body?.email || '')
    .trim()
    .toLowerCase()

  const password = String(req.body?.password || '')

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      error: 'EMAIL_AND_PASSWORD_REQUIRED'
    })
  }

  try {
    const supabase = getSupabaseAdmin()

    const clientIdentifier = getClientIdentifier(req)
    const identifierHash = hashClientIdentifier(clientIdentifier)

    let rateLimitStatus

    try {
      rateLimitStatus = await checkAuthRateLimit(
        'customer-login',
        identifierHash
      )
    } catch {
      return res.status(503).json({
        ok: false,
        error: 'AUTHENTICATION_SERVICE_UNAVAILABLE'
      })
    }

    if (!rateLimitStatus.allowed) {
      res.setHeader(
        'Retry-After',
        String(rateLimitStatus.retryAfter)
      )

      return res.status(429).json({
        ok: false,
        error: 'TOO_MANY_LOGIN_ATTEMPTS',
        retry_after: rateLimitStatus.retryAfter
      })
    }

    const { data: user, error } = await supabase
      .from('users')
      .select(
        'id,email,full_name,status,password_hash,must_change_password'
      )
      .eq('email', email)
      .maybeSingle()

    if (error) {
      return res.status(500).json({
        ok: false,
        error: 'DATABASE_QUERY_FAILED'
      })
    }

    if (
      !user ||
      user.status !== 'active' ||
      !user.password_hash
    ) {
      try {
        await recordAuthFailure(
          'customer-login',
          identifierHash
        )
      } catch {
        return res.status(503).json({
          ok: false,
          error: 'AUTHENTICATION_SERVICE_UNAVAILABLE'
        })
      }

      return res.status(401).json({
        ok: false,
        error: 'INVALID_LOGIN'
      })
    }

    const passwordVerification = verifyCustomerPassword(
      password,
      user.password_hash
    )

    if (!passwordVerification.valid) {
      try {
        await recordAuthFailure(
          'customer-login',
          identifierHash
        )
      } catch {
        return res.status(503).json({
          ok: false,
          error: 'AUTHENTICATION_SERVICE_UNAVAILABLE'
        })
      }

      return res.status(401).json({
        ok: false,
        error: 'INVALID_LOGIN'
      })
    }

    /*
     * Successful legacy authentication is immediately upgraded
     * from SHA-256 to the production scrypt format.
     *
     * Never return or log the password or either hash.
     */
    if (passwordVerification.legacy) {
      const upgradedPasswordHash = hashPassword(password)

      const { error: upgradeError } = await supabase
        .from('users')
        .update({
          password_hash: upgradedPasswordHash
        })
        .eq('id', user.id)

      if (upgradeError) {
        return res.status(500).json({
          ok: false,
          error: 'PASSWORD_MIGRATION_FAILED'
        })
      }
    }

    try {
      await clearAuthRateLimit(
        'customer-login',
        identifierHash
      )
    } catch {
      return res.status(503).json({
        ok: false,
        error: 'AUTHENTICATION_SERVICE_UNAVAILABLE'
      })
    }

    createCustomerSession(res, user)

    await supabase
      .from('users')
      .update({
        last_login_at: new Date().toISOString()
      })
      .eq('id', user.id)

    return res.status(200).json({
      ok: true,
      authenticated: true,
      role: 'CUSTOMER',
      must_change_password: Boolean(user.must_change_password),
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name
      }
    })

  } catch {
    return res.status(500).json({
      ok: false,
      error: 'AUTHENTICATION_SERVICE_ERROR'
    })
  }
}
