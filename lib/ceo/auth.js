import crypto from 'crypto'

export const CEO_ROLE = 'FOUNDER_CHAIRMAN_CEO'

const SESSION_COOKIE = 'trilink_ceo_session'
const SESSION_MAX_AGE = 60 * 60 * 8

function getSecret() {
  return process.env.TRILINK_CEO_AUTH_SECRET || ''
}

function hash(value) {
  return crypto
    .createHash('sha256')
    .update(value)
    .digest('hex')
}

export function isAuthConfigured() {
  return Boolean(
    process.env.TRILINK_CEO_AUTH_SECRET &&
    process.env.TRILINK_CEO_LOGIN &&
    process.env.TRILINK_CEO_PASSWORD_HASH
  )
}

export function verifyCEOLogin(login, password) {
  if (!isAuthConfigured()) {
    return false
  }

  if (login !== process.env.TRILINK_CEO_LOGIN) {
    return false
  }

  const suppliedHash = hash(password)
  const expectedHash = process.env.TRILINK_CEO_PASSWORD_HASH

  return crypto.timingSafeEqual(
    Buffer.from(suppliedHash),
    Buffer.from(expectedHash)
  )
}

export function createCEOAuthenticationToken() {
  const timestamp = Date.now().toString()
  const payload = `${CEO_ROLE}.${timestamp}`

  const signature = crypto
    .createHmac('sha256', getSecret())
    .update(payload)
    .digest('hex')

  return Buffer.from(
    `${payload}.${signature}`
  ).toString('base64url')
}

export function verifyCEOAuthenticationToken(token) {
  if (!token || !getSecret()) {
    return false
  }

  try {
    const decoded = Buffer
      .from(token, 'base64url')
      .toString()

    const parts = decoded.split('.')

    if (parts.length !== 3) {
      return false
    }

    const [role, timestamp, signature] = parts

    if (role !== CEO_ROLE) {
      return false
    }

    const age = Date.now() - Number(timestamp)

    if (!Number.isFinite(age) || age < 0 || age > SESSION_MAX_AGE * 1000) {
      return false
    }

    const payload = `${role}.${timestamp}`

    const expected = crypto
      .createHmac('sha256', getSecret())
      .update(payload)
      .digest('hex')

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    )
  } catch {
    return false
  }
}

export function getCEOIdentity(req) {
  const cookies = req.headers.cookie || ''

  const match = cookies
    .split(';')
    .map(value => value.trim())
    .find(value =>
      value.startsWith(`${SESSION_COOKIE}=`)
    )

  if (!match) {
    return null
  }

  const token = match.substring(
    `${SESSION_COOKIE}=`.length
  )

  if (!verifyCEOAuthenticationToken(token)) {
    return null
  }

  return {
    authenticated: true,
    role: CEO_ROLE
  }
}

export function setCEOAuthenticationCookie(res, token) {
  res.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_MAX_AGE}`
  )
}

export function clearCEOAuthenticationCookie(res) {
  res.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
  )
}
