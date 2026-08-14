export const ENERGY_STATUSES = [
  'draft',
  'pending',
  'active',
  'processing',
  'completed',
  'cancelled',
  'failed'
]

export const ENERGY_TYPES = [
  'electricity',
  'solar',
  'gas',
  'fuel',
  'renewable',
  'battery',
  'other'
]

export const ENERGY_PERMISSIONS = [
  'ceo.energy.view',
  'ceo.energy.control'
]

export const ENERGY_PROJECT_STATUSES = [
  'draft',
  'pending',
  'active',
  'processing',
  'completed',
  'cancelled',
  'failed'
]

export const ENERGY_PRIORITIES = [
  'low',
  'medium',
  'high',
  'critical'
]

export function validEnergyStatus(value) {
  return ENERGY_STATUSES.includes(value)
}

export function validEnergyType(value) {
  return ENERGY_TYPES.includes(value)
}

export function validProjectStatus(value) {
  return ENERGY_PROJECT_STATUSES.includes(value)
}

export function validEnergyPriority(value) {
  return ENERGY_PRIORITIES.includes(value)
}
