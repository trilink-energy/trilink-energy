/**
 * TriLink Database Configuration
 *
 * Database configuration is derived from the existing
 * Supabase environment configuration.
 *
 * NEVER place credentials or secret values in source code.
 */

const provider =
  process.env.TRILINK_DATABASE_PROVIDER ||
  (process.env.NEXT_PUBLIC_SUPABASE_URL ? 'supabase' : 'not_configured')

const databaseUrl =
  process.env.TRILINK_DATABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  ''

const anonKey =
  process.env.TRILINK_DATABASE_ANON_KEY ||
  ''

const serviceKey =
  process.env.TRILINK_DATABASE_SERVICE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  ''

export const databaseConfig = {
  provider,
  urlConfigured: Boolean(databaseUrl),
  anonKeyConfigured: Boolean(anonKey),
  serviceKeyConfigured: Boolean(serviceKey)
}

export function isDatabaseConfigured() {
  return Boolean(
    provider !== 'not_configured' &&
    databaseUrl &&
    serviceKey
  )
}
