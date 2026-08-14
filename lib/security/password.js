/*
 * TriLink Password Security
 *
 * Production password hashing using Node.js scrypt.
 *
 * Format:
 * scrypt$N$r$p$salt$hash
 *
 * Legacy SHA-256 hashes remain verifiable temporarily so existing
 * accounts are not immediately locked out. Successful legacy
 * authentication can subsequently be upgraded to scrypt.
 *
 * Never log passwords, hashes, salts or tokens.
 */

import crypto from 'crypto'

const SCRYPT_N = 16384
const SCRYPT_R = 8
const SCRYPT_P = 1
const KEY_LENGTH = 64
const SALT_LENGTH = 16

function safeEqual(a, b) {
  const left = Buffer.from(String(a))
  const right = Buffer.from(String(b))

  if (left.length !== right.length) {
    return false
  }

  return crypto.timingSafeEqual(left, right)
}

export function hashPassword(password) {
  if (typeof password !== 'string' || !password) {
    throw new Error('PASSWORD_REQUIRED')
  }

  const salt = crypto.randomBytes(SALT_LENGTH)

  const derived = crypto.scryptSync(
    password,
    salt,
    KEY_LENGTH,
    {
      N: SCRYPT_N,
      r: SCRYPT_R,
      p: SCRYPT_P,
      maxmem: 32 * 1024 * 1024
    }
  )

  return [
    'scrypt',
    SCRYPT_N,
    SCRYPT_R,
    SCRYPT_P,
    salt.toString('base64url'),
    derived.toString('base64url')
  ].join('$')
}

export function isScryptHash(value) {
  return typeof value === 'string' &&
    value.startsWith('scrypt$')
}

export function verifyScryptPassword(password, storedHash) {
  try {
    if (
      typeof password !== 'string' ||
      typeof storedHash !== 'string'
    ) {
      return false
    }

    const parts = storedHash.split('$')

    if (parts.length !== 6 || parts[0] !== 'scrypt') {
      return false
    }

    const N = Number(parts[1])
    const r = Number(parts[2])
    const p = Number(parts[3])

    if (
      !Number.isInteger(N) ||
      !Number.isInteger(r) ||
      !Number.isInteger(p)
    ) {
      return false
    }

    const salt = Buffer.from(parts[4], 'base64url')
    const expected = Buffer.from(parts[5], 'base64url')

    const derived = crypto.scryptSync(
      password,
      salt,
      expected.length,
      {
        N,
        r,
        p,
        maxmem: 32 * 1024 * 1024
      }
    )

    return safeEqual(derived, expected)
  } catch {
    return false
  }
}

export function hashLegacyPassword(password) {
  return crypto
    .createHash('sha256')
    .update(String(password))
    .digest('hex')
}

export function verifyPassword(password, storedHash) {
  if (!password || !storedHash) {
    return {
      valid: false,
      legacy: false
    }
  }

  if (isScryptHash(storedHash)) {
    return {
      valid: verifyScryptPassword(password, storedHash),
      legacy: false
    }
  }

  const legacyHash = hashLegacyPassword(password)

  return {
    valid: safeEqual(legacyHash, storedHash),
    legacy: true
  }
}

export function shouldUpgradePasswordHash(storedHash) {
  return typeof storedHash === 'string' &&
    !isScryptHash(storedHash)
}
