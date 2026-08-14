import { getSupabaseAdmin } from '../supabase/server'

export function getDataClient() {
  return getSupabaseAdmin()
}

export function dataQuery(table) {
  const client = getDataClient()

  if (!table || typeof table !== 'string') {
    throw new Error('INVALID_DATA_TABLE')
  }

  return client.from(table)
}
