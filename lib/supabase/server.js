import { createClient } from '@supabase/supabase-js'

function getConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  }
}

export function isSupabaseConfigured() {
  const config = getConfig()

  return Boolean(
    config.url &&
    config.serviceKey
  )
}

export function getSupabaseAdmin() {
  const config = getConfig()

  if (!config.url || !config.serviceKey) {
    throw new Error('SUPABASE_NOT_CONFIGURED')
  }

  return createClient(
    config.url,
    config.serviceKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
