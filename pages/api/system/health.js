import {
  SYSTEM_MODULES
} from '../../../lib/system/modules'
import {
  getAPIRegistry
} from '../../../lib/system/api-registry'
import {
  getModuleConnectivity
} from '../../../lib/system/connectivity'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const connectivity = getModuleConnectivity()
  const routes = getAPIRegistry()

  const modulesConnected =
    SYSTEM_MODULES.filter(module =>
      Object.prototype.hasOwnProperty.call(
        connectivity,
        module
      )
    )

  const missingModules =
    SYSTEM_MODULES.filter(module =>
      !Object.prototype.hasOwnProperty.call(
        connectivity,
        module
      )
    )

  return res.status(200).json({
    ok: true,
    system: 'TriLink',
    modules: SYSTEM_MODULES.length,
    connected_modules: modulesConnected.length,
    api_routes: routes.length,
    status: missingModules.length === 0
      ? 'healthy'
      : 'partial',
    generated_at: new Date().toISOString()
  })
}
