export const INTEGRATION_MODULES = [
  'customer',
  'supplier',
  'trade',
  'logistics',
  'energy',
  'finance',
  'approvals',
  'ai',
  'risk',
  'audit',
  'settings',
  'public'
]

export const INTEGRATION_STATUS = [
  'available',
  'configured',
  'pending',
  'error'
]

export function validIntegrationModule(value) {
  return INTEGRATION_MODULES.includes(value)
}

export function integrationStatus(value) {
  if (!value) return 'pending'
  return INTEGRATION_STATUS.includes(value)
    ? value
    : 'error'
}

/*
 * Compatibility alias.
 * Existing API routes use PLATFORM_MODULES.
 */
export const PLATFORM_MODULES = INTEGRATION_MODULES

/*
 * Integration relationships used by the status API.
 */
export const INTEGRATION_LINKS = [
  {
    from: 'customer',
    to: 'supplier'
  },
  {
    from: 'trade',
    to: 'logistics'
  },
  {
    from: 'energy',
    to: 'finance'
  },
  {
    from: 'approvals',
    to: 'ai'
  },
  {
    from: 'risk',
    to: 'audit'
  },
  {
    from: 'settings',
    to: 'public'
  }
]
