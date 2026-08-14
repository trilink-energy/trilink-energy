import {
  getAPIRegistry
} from '../../../lib/system/api-registry'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const routes = getAPIRegistry()

  return res.status(200).json({
    ok: true,
    count: routes.length,
    routes
  })
}
