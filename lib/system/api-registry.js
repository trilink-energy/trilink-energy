export const API_REGISTRY = [
  '/api/ceo',
  '/api/ceo/login',
  '/api/ceo/logout',
  '/api/ceo/session',
  '/api/ceo/overview',
  '/api/auth/status',
  '/api/auth/customer-login',
  '/api/auth/customer-session',
  '/api/auth/customer-logout',
  '/api/auth/change-password',
  '/api/customer/provision',
  '/api/integration',
  '/api/integration/auth',
  '/api/integration/customer-supplier',
  '/api/integration/trade-logistics',
  '/api/integration/energy-finance',
  '/api/integration/approval-ai',
  '/api/integration/risk-audit',
  '/api/integration/admin',
  '/api/integration/frontend'
]

export function getAPIRegistry() {
  return API_REGISTRY
}
