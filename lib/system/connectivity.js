export const MODULE_CONNECTIVITY = {
  customer: [
    'trade',
    'logistics',
    'finance'
  ],

  supplier: [
    'trade',
    'logistics',
    'finance'
  ],

  trade: [
    'customer',
    'supplier',
    'logistics',
    'finance'
  ],

  logistics: [
    'trade',
    'supplier',
    'customer',
    'energy'
  ],

  energy: [
    'trade',
    'finance',
    'approvals',
    'risk'
  ],

  finance: [
    'trade',
    'logistics',
    'energy',
    'approvals'
  ],

  approvals: [
    'finance',
    'ai',
    'risk',
    'audit'
  ],

  ai: [
    'approvals',
    'risk',
    'audit'
  ],

  risk: [
    'ai',
    'approvals',
    'audit'
  ],

  audit: [
    'risk',
    'finance',
    'approvals',
    'ai'
  ],

  settings: [
    'security',
    'administration'
  ],

  public: [
    'customer',
    'supplier',
    'trade',
    'logistics',
    'energy'
  ]
}

export function getModuleConnectivity() {
  return MODULE_CONNECTIVITY
}
