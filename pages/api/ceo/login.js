import {
  isAuthConfigured,
  verifyCEOLogin,
  createCEOAuthenticationToken,
  setCEOAuthenticationCookie
} from '../../../lib/ceo/auth'

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
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  if (!isAuthConfigured()) {
    return res.status(503).json({
      ok: false,
      authenticated: false,
      error: 'CEO_AUTH_NOT_CONFIGURED'
    })
  }

  const clientIdentifier = getClientIdentifier(req)
  const identifierHash = hashClientIdentifier(clientIdentifier)

  let rateLimitStatus

  try {
    rateLimitStatus = await checkAuthRateLimit(
      'ceo-login',
      identifierHash
    )
  } catch {
    return res.status(503).json({
      ok: false,
      authenticated: false,
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
      authenticated: false,
      error: 'TOO_MANY_LOGIN_ATTEMPTS',
      retry_after: rateLimitStatus.retryAfter
    })
  }

  const { login, password } = req.body || {}

  if (
    typeof login !== 'string' ||
    typeof password !== 'string'
  ) {
    return res.status(400).json({
      ok: false,
      error: 'LOGIN_AND_PASSWORD_REQUIRED'
    })
  }

  if (!verifyCEOLogin(login, password)) {
    try {
      await recordAuthFailure(
        'ceo-login',
        identifierHash
      )
    } catch {
      return res.status(503).json({
        ok: false,
        authenticated: false,
        error: 'AUTHENTICATION_SERVICE_UNAVAILABLE'
      })
    }

    return res.status(401).json({
      ok: false,
      authenticated: false,
      error: 'INVALID_CREDENTIALS'
    })
  }

  try {
    await clearAuthRateLimit(
      'ceo-login',
      identifierHash
    )
  } catch {
    return res.status(503).json({
      ok: false,
      authenticated: false,
      error: 'AUTHENTICATION_SERVICE_UNAVAILABLE'
    })
  }

  const token = createCEOAuthenticationToken()

  setCEOAuthenticationCookie(res, token)

  return res.status(200).json({
    ok: true,
    authenticated: true,
    role: 'FOUNDER_CHAIRMAN_CEO'
  })
}
