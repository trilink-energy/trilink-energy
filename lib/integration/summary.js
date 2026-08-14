import {
  PLATFORM_MODULES,
  INTEGRATION_LINKS
} from './constants'

export function getPlatformSummary() {
  return {
    platform: 'TriLink',
    modules: PLATFORM_MODULES.length,
    integrations: INTEGRATION_LINKS.length,
    module_names: PLATFORM_MODULES
  }
}
