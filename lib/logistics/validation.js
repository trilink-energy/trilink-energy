import {
  LOGISTICS_STATUSES,
  SHIPMENT_MODES,
  SHIPMENT_PRIORITIES
} from './constants'

export function validStatus(value) {
  return LOGISTICS_STATUSES.includes(value)
}

export function validMode(value) {
  return SHIPMENT_MODES.includes(value)
}

export function validPriority(value) {
  return SHIPMENT_PRIORITIES.includes(value)
}

export function validShipmentReference(value) {
  return (
    typeof value === 'string' &&
    value.trim().length >= 3 &&
    value.trim().length <= 100
  )
}

/*
 * Generic route field validation helpers.
 * Kept compatible with existing logistics API routes.
 */

export function requiredString(value, field = 'value') {
  if (typeof value !== 'string' || !value.trim()) {
    return {
      ok: false,
      error: `${field} is required`
    }
  }

  return {
    ok: true,
    value: value.trim()
  }
}

export function optionalString(value) {
  if (value === undefined || value === null || value === '') {
    return {
      ok: true,
      value: null
    }
  }

  if (typeof value !== 'string') {
    return {
      ok: false,
      error: 'value must be a string'
    }
  }

  return {
    ok: true,
    value: value.trim()
  }
}
