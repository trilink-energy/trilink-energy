/*
 * TriLink Rate Limiting Foundation
 *
 * Database-backed authentication rate limiting.
 *
 * Raw request identifiers must never be stored.
 * Callers should hash the identifier before persistence.
 */

import crypto from 'crypto'

const WINDOW_SECONDS = 15 * 60
const MAX_ATTEMPTS = 5

export const RATE_LIMIT_WINDOW_SECONDS = WINDOW_SECONDS
export const RATE_LIMIT_MAX_ATTEMPTS = MAX_ATTEMPTS

export function getClientIdentifier(req) {
  const forwarded = req?.headers?.['x-forwarded-for']

  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim()
  }

  const realIp = req?.headers?.['x-real-ip']

  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim()
  }

  return 'unknown'
}

export function hashClientIdentifier(identifier) {
  return crypto
    .createHash('sha256')
    .update(String(identifier || 'unknown'))
    .digest('hex')
}

export function buildRateLimitKey(scope, identifier) {
  return `${String(scope || 'unknown')}:${String(identifier || 'unknown')}`
}

function getTimestampMilliseconds(value) {
  if (value === null || value === undefined) {
    return 0
  }

  if (typeof value === 'number') {
    return value
  }

  const numeric = Number(value)

  if (Number.isFinite(numeric)) {
    return numeric
  }

  const parsed = Date.parse(String(value))

  return Number.isFinite(parsed) ? parsed : 0
}

export function isRateLimited(record, now = Date.now()) {
  if (!record) {
    return false
  }

  const blockedUntil = getTimestampMilliseconds(
    record.blocked_until
  )

  if (blockedUntil && now < blockedUntil) {
    return true
  }

  const windowStart = getTimestampMilliseconds(
    record.window_start
  )

  const attempts = Number(record.attempts || 0)

  if (
    !windowStart ||
    now - windowStart >= WINDOW_SECONDS * 1000
  ) {
    return false
  }

  return attempts >= MAX_ATTEMPTS
}

export function getRetryAfter(record, now = Date.now()) {
  if (!record) {
    return 0
  }

  const blockedUntil = getTimestampMilliseconds(
    record.blocked_until
  )

  if (blockedUntil && now < blockedUntil) {
    return Math.max(
      0,
      Math.ceil((blockedUntil - now) / 1000)
    )
  }

  const windowStart = getTimestampMilliseconds(
    record.window_start
  )

  if (!windowStart) {
    return 0
  }

  const elapsed = Math.max(
    0,
    now - windowStart
  )

  return Math.max(
    0,
    Math.ceil(
      WINDOW_SECONDS - elapsed / 1000
    )
  )
}
