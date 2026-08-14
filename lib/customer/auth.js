import crypto from 'crypto'
import {
  hashPassword as secureHashPassword,
  verifyPassword as secureVerifyPassword,
  shouldUpgradePasswordHash
} from '../security/password'

export const CUSTOMER_COOKIE = 'trilink_customer_session'
export const CUSTOMER_SESSION_AGE = 8 * 60 * 60

function getCustomerSessionSecret() {
  return process.env.TRILINK_CUSTOMER_SESSION_SECRET || ''
}

export function hashPassword(value) {
  return secureHashPassword(value)
}

export function verifyCustomerPassword(value, storedHash) {
  return secureVerifyPassword(value, storedHash)
}

export {
  shouldUpgradePasswordHash
}

export function generateTemporaryPassword() {
  return crypto
    .randomBytes(18)
    .toString('base64url')
}

function signValue(value) {
  const secret = getCustomerSessionSecret()

  if (!secret) {
    throw new Error(
      'TRILINK_CUSTOMER_SESSION_SECRET is not configured'
    )
  }

  return crypto
    .createHmac('sha256', secret)
    .update(value)
    .digest('base64url')
}

function createSessionToken(payload) {
  const encodedPayload = Buffer
    .from(JSON.stringify(payload))
    .toString('base64url')

  const signature = signValue(encodedPayload)

  return `${encodedPayload}.${signature}`
}

function verifySessionToken(token) {
  if (typeof token !== 'string') {
    return null
  }

  const parts = token.split('.')

  if (parts.length !== 2) {
    return null
  }

  const [
    encodedPayload,
    providedSignature
  ] = parts

  if (!encodedPayload || !providedSignature) {
    return null
  }

  let expectedSignature

  try {
    expectedSignature = signValue(encodedPayload)
  } catch {
    return null
  }

  const providedBuffer = Buffer.from(
    providedSignature,
    'utf8'
  )

  const expectedBuffer = Buffer.from(
    expectedSignature,
    'utf8'
  )

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(
      providedBuffer,
      expectedBuffer
    )
  ) {
    return null
  }

  try {
    const payload = JSON.parse(
      Buffer
        .from(encodedPayload, 'base64url')
        .toString('utf8')
    )

    if (
      !payload ||
      payload.type !== 'CUSTOMER' ||
      !payload.id ||
      !payload.expires ||
      Date.now() > Number(payload.expires)
    ) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export function createCustomerSession(res, user) {
  const payload = {
    id: user.id,
    username: user.username || null,
    email: user.email || null,
    type: 'CUSTOMER',
    expires: Date.now() + CUSTOMER_SESSION_AGE * 1000
  }

  const token = createSessionToken(payload)

  setCustomerCookie(res, token)

  return token
}

export function readCustomerSession(req) {
  const cookies = req.headers.cookie || ''

  const match = cookies
    .split(';')
    .map(value => value.trim())
    .find(value =>
      value.startsWith(`${CUSTOMER_COOKIE}=`)
    )

  if (!match) {
    return null
  }

  const token = match.substring(
    `${CUSTOMER_COOKIE}=`.length
  )

  return verifySessionToken(token)
}

export function setCustomerCookie(res, token) {
  res.setHeader(
    'Set-Cookie',
    `${CUSTOMER_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${CUSTOMER_SESSION_AGE}`
  )
}

export function clearCustomerCookie(res) {
  res.setHeader(
    'Set-Cookie',
    `${CUSTOMER_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
  )
}
