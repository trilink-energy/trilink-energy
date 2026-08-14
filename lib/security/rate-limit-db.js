/*
 * TriLink Database Rate Limiting
 *
 * Server-side authentication rate limiting.
 *
 * Raw client identifiers are never persisted.
 * The caller supplies an already-hashed identifier.
 *
 * LOCAL IMPLEMENTATION — DO NOT DEPLOY UNTIL AUDITED.
 */

import { getSupabaseAdmin } from '../supabase/server'

import {
  RATE_LIMIT_WINDOW_SECONDS,
  RATE_LIMIT_MAX_ATTEMPTS,
  isRateLimited,
  getRetryAfter
} from './rate-limit'

function getWindowStart(record) {
  if (!record) {
    return new Date().toISOString()
  }

  const value = record.window_start

  if (!value) {
    return new Date().toISOString()
  }

  const parsed = Date.parse(String(value))

  if (!Number.isFinite(parsed)) {
    return new Date().toISOString()
  }

  const now = Date.now()

  if (
    now - parsed >=
    RATE_LIMIT_WINDOW_SECONDS * 1000
  ) {
    return new Date().toISOString()
  }

  return new Date(parsed).toISOString()
}

function getCurrentAttempts(record) {
  if (!record) {
    return 0
  }

  const attempts = Number(record.attempts || 0)

  return Number.isFinite(attempts)
    ? Math.max(0, attempts)
    : 0
}

export async function checkAuthRateLimit(
  scope,
  identifierHash
) {
  const supabase = getSupabaseAdmin()

  const { data: record, error } = await supabase
    .from('auth_rate_limits')
    .select(
      'id,scope,identifier_hash,attempts,window_start,blocked_until,last_attempt_at,updated_at'
    )
    .eq('scope', scope)
    .eq('identifier_hash', identifierHash)
    .maybeSingle()

  if (error) {
    throw error
  }

  if (!record) {
    return {
      allowed: true,
      retryAfter: 0,
      record: null
    }
  }

  const limited = isRateLimited(record)

  return {
    allowed: !limited,
    retryAfter: limited
      ? getRetryAfter(record)
      : 0,
    record
  }
}

export async function recordAuthFailure(
  scope,
  identifierHash
) {
  const supabase = getSupabaseAdmin()

  const { data: existing, error: readError } = await supabase
    .from('auth_rate_limits')
    .select(
      'id,scope,identifier_hash,attempts,window_start,blocked_until,last_attempt_at,updated_at'
    )
    .eq('scope', scope)
    .eq('identifier_hash', identifierHash)
    .maybeSingle()

  if (readError) {
    throw readError
  }

  const now = new Date()
  const nowIso = now.toISOString()

  const currentAttempts = getCurrentAttempts(existing)

  let attempts
  let windowStart
  let blockedUntil = null

  if (
    !existing ||
    !existing.window_start ||
    Date.now() -
      Date.parse(String(existing.window_start)) >=
      RATE_LIMIT_WINDOW_SECONDS * 1000
  ) {
    attempts = 1
    windowStart = nowIso
  } else {
    attempts = currentAttempts + 1
    windowStart = getWindowStart(existing)
  }

  if (attempts >= RATE_LIMIT_MAX_ATTEMPTS) {
    blockedUntil = new Date(
      Date.now() +
      RATE_LIMIT_WINDOW_SECONDS * 1000
    ).toISOString()
  }

  const payload = {
    scope,
    identifier_hash: identifierHash,
    attempts,
    window_start: windowStart,
    blocked_until: blockedUntil,
    last_attempt_at: nowIso,
    updated_at: nowIso
  }

  const { data, error } = await supabase
    .from('auth_rate_limits')
    .upsert(
      payload,
      {
        onConflict: 'scope,identifier_hash'
      }
    )
    .select(
      'id,scope,identifier_hash,attempts,window_start,blocked_until,last_attempt_at,updated_at'
    )
    .single()

  if (error) {
    throw error
  }

  return {
    record: data,
    limited: isRateLimited(data),
    retryAfter: getRetryAfter(data)
  }
}

export async function clearAuthRateLimit(
  scope,
  identifierHash
) {
  const supabase = getSupabaseAdmin()

  const { error } = await supabase
    .from('auth_rate_limits')
    .delete()
    .eq('scope', scope)
    .eq('identifier_hash', identifierHash)

  if (error) {
    throw error
  }
}
