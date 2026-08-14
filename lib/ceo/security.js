/**
 * TriLink CEO Security Foundation
 *
 * This module defines the security policy for the CEO area.
 *
 * IMPORTANT:
 * This is a policy layer, NOT a substitute for production
 * authentication. Real authentication/session verification
 * will be connected in the authentication implementation phase.
 */

export const CEO_ROLE = 'FOUNDER_CHAIRMAN_CEO'

export const CEO_PERMISSIONS = [
  'ceo.dashboard.view',
  'ceo.ai.view',
  'ceo.ai.control',
  'ceo.ai.permissions',
  'ceo.trade.view',
  'ceo.trade.control',
  'ceo.logistics.view',
  'ceo.logistics.control',
  'ceo.energy.view',
  'ceo.energy.control',
  'ceo.customers.view',
  'ceo.customers.control',
  'ceo.suppliers.view',
  'ceo.suppliers.control',
  'ceo.finance.view',
  'ceo.finance.approve',
  'ceo.approvals.view',
  'ceo.approvals.execute',
  'ceo.risk.view',
  'ceo.audit.view',
  'ceo.settings.view',
  'ceo.settings.control',
  'ceo.emergency.shutdown'
]

export const HIGH_RISK_PERMISSIONS = [
  'ceo.ai.permissions',
  'ceo.finance.approve',
  'ceo.approvals.execute',
  'ceo.settings.control',
  'ceo.emergency.shutdown'
]

export function isCEOIdentity(identity) {
  return Boolean(
    identity &&
    identity.authenticated === true &&
    identity.role === CEO_ROLE
  )
}

export function hasCEOPermission(identity, permission) {
  if (!isCEOIdentity(identity)) {
    return false
  }

  return CEO_PERMISSIONS.includes(permission)
}

export function isHighRiskPermission(permission) {
  return HIGH_RISK_PERMISSIONS.includes(permission)
}

/**
 * Production rule:
 *
 * No request should be treated as authenticated merely because
 * it supplies a role or user identifier from the browser.
 *
 * The future authentication layer must establish:
 *
 * authenticated === true
 * role === FOUNDER_CHAIRMAN_CEO
 * valid server-side session
 * valid permission scope
 */
export function requireCEOIdentity(identity) {
  if (!isCEOIdentity(identity)) {
    const error = new Error('CEO authentication required')
    error.code = 'CEO_AUTH_REQUIRED'
    throw error
  }

  return identity
}
