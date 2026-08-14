import { getSupabaseAdmin } from '../../../lib/supabase/server'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const result = {
    ok: false,
    runtime: {
      ceo_login: Boolean(process.env.TRILINK_CEO_LOGIN),
      ceo_password_hash: Boolean(process.env.TRILINK_CEO_PASSWORD_HASH),
      ceo_auth_secret: Boolean(process.env.TRILINK_CEO_AUTH_SECRET),
      supabase_url: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      supabase_service_key: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
    },
    supabase: {
      configured: false,
      query: false
    }
  }

  try {
    result.supabase.configured = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    if (result.supabase.configured) {
      const supabase = getSupabaseAdmin()

      const { error } = await supabase
        .from('auth_rate_limits')
        .select('id')
        .eq('scope', 'ceo-login')
        .limit(1)

      if (error) {
        return res.status(503).json({
          ...result,
          error: 'SUPABASE_QUERY_FAILED',
          supabase_error: {
            code: error.code || null,
            message: error.message || null
          }
        })
      }

      result.supabase.query = true
    }

    result.ok =
      result.runtime.ceo_login &&
      result.runtime.ceo_password_hash &&
      result.runtime.ceo_auth_secret &&
      result.runtime.supabase_url &&
      result.runtime.supabase_service_key &&
      result.supabase.configured &&
      result.supabase.query

    return res.status(result.ok ? 200 : 503).json(result)
  } catch (error) {
    return res.status(503).json({
      ...result,
      error: 'RUNTIME_DIAGNOSTIC_FAILED',
      message: error?.message || 'UNKNOWN_ERROR'
    })
  }
}
