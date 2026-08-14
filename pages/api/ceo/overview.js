import { getSupabaseAdmin } from '../../../lib/supabase/server'
import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'

const tables = [
  'customers',
  'suppliers',
  'trade_opportunities',
  'quotations',
  'orders',
  'shipments',
  'energy_projects',
  'invoices',
  'payments',
  'risks',
  'compliance_records',
  'approvals',
  'ai_agents',
  'ai_tasks',
  'ai_actions',
  'audit_logs',
  'system_events'
]

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'METHOD_NOT_ALLOWED' })
  }

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      error: 'CEO_AUTHENTICATION_REQUIRED'
    })
  }

  if (!hasCEOPermission(identity, 'ceo.dashboard.view')) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  try {
    const supabaseAdmin = getSupabaseAdmin()
    const results = {}

    for (const table of tables) {
      const { count, error } = await supabaseAdmin
        .from(table)
        .select('*', { count: 'exact', head: true })

      if (error) {
        return res.status(500).json({
          ok: false,
          error: 'DATABASE_QUERY_FAILED',
          table,
          detail: error.message
        })
      }

      results[table] = count || 0
    }

    return res.status(200).json({
      ok: true,
      database: 'reachable',
      generated_at: new Date().toISOString(),
      counts: results
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: 'CEO_OVERVIEW_FAILED',
      detail: error.message
    })
  }
}
