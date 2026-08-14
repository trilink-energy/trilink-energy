import {
  isSupabaseConfigured,
  getSupabaseAdmin
} from '../../../lib/supabase/server'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  if (!isSupabaseConfigured()) {
    return res.status(503).json({
      ok: false,
      configured: false,
      connected: false,
      error: 'SUPABASE_NOT_CONFIGURED'
    })
  }

  try {
    const supabase = getSupabaseAdmin()

    const { error } = await supabase
      .from('system_schema_versions')
      .select('version, description, applied_at')
      .order('applied_at', {
        ascending: false
      })
      .limit(1)

    if (error) {
      return res.status(503).json({
        ok: false,
        configured: true,
        connected: false,
        error: 'DATABASE_QUERY_FAILED',
        detail: error.message
      })
    }

    return res.status(200).json({
      ok: true,
      configured: true,
      connected: true,
      provider: 'supabase',
      database: 'reachable'
    })
  } catch (error) {
    return res.status(503).json({
      ok: false,
      configured: true,
      connected: false,
      error: error.message || 'SUPABASE_CONNECTION_FAILED'
    })
  }
}
