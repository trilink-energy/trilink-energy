export const PLATFORM_REGISTRY = {
  customer: {
    name: 'Customer Portal',
    status: 'active',
    route: '/customer'
  },
  supplier: {
    name: 'Supplier Portal',
    status: 'active',
    route: '/supplier'
  },
  trade: {
    name: 'TriLink Trade',
    status: 'active',
    route: '/trade'
  },
  logistics: {
    name: 'TriLink Logistics',
    status: 'active',
    route: '/logistics'
  },
  energy: {
    name: 'TriLink Energy',
    status: 'active',
    route: '/energy'
  },
  finance: {
    name: 'Finance',
    status: 'active',
    route: '/finance'
  },
  approvals: {
    name: 'Approval Engine',
    status: 'active',
    route: '/approvals'
  },
  ai: {
    name: 'AI Platform',
    status: 'active',
    route: '/ai'
  },
  risk: {
    name: 'Risk + Audit',
    status: 'active',
    route: '/risk'
  },
  settings: {
    name: 'Settings + Administration',
    status: 'active',
    route: '/settings'
  }
}

export function getPlatform(key) {
  return PLATFORM_REGISTRY[key] || null
}

export function getPlatforms() {
  return Object.values(PLATFORM_REGISTRY)
}
