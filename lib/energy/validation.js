import {
  ENERGY_STATUSES,
  ENERGY_TYPES,
  ENERGY_PROJECT_STATUSES,
  ENERGY_PRIORITIES
} from './constants'

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

export function validEnergyReference(value) {
  return (
    typeof value === 'string' &&
    value.trim().length >= 3 &&
    value.trim().length <= 100
  )
}
