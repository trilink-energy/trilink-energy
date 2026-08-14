export const SECURITY_BOUNDARIES = {
  public: 'public',
  customer: 'customer-session',
  supplier: 'authenticated-portal',
  ceo: 'ceo-session',
  administration: 'ceo-permission'
}

export function getSecurityBoundary(module) {
  return SECURITY_BOUNDARIES[module] || 'unknown'
}
