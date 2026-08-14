import {
  SYSTEM_MODULES,
  SYSTEM_LAYERS
} from '../../../lib/system/modules'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  return res.status(200).json({
    ok: true,
    system: 'TriLink',
    status: 'operational-foundation',
    modules: SYSTEM_MODULES,
    layers: SYSTEM_LAYERS,
    generated_at: new Date().toISOString()
  })
}
