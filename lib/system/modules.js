export const SYSTEM_MODULES = [
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

export const SYSTEM_LAYERS = [
  'authentication',
  'authorization',
  'api',
  'database',
  'frontend',
  'audit'
]

export function isSystemModule(value) {
  return SYSTEM_MODULES.includes(value)
}
