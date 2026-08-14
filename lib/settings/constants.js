export const SETTING_GROUPS = [
  'general',
  'security',
  'notifications',
  'finance',
  'trade',
  'logistics',
  'energy',
  'ai'
]

export const ADMIN_ACTIONS = [
  'view',
  'update',
  'enable',
  'disable',
  'reset'
]

export function validSettingGroup(value) {
  return SETTING_GROUPS.includes(value)
}

export function validAdminAction(value) {
  return ADMIN_ACTIONS.includes(value)
}
