import {
  APPROVAL_STATUSES,
  APPROVAL_TYPES,
  APPROVAL_PRIORITIES,
  APPROVAL_ACTIONS
} from './constants'

export function validApprovalStatus(value) {
  return APPROVAL_STATUSES.includes(value)
}

export function validApprovalType(value) {
  return APPROVAL_TYPES.includes(value)
}

export function validApprovalPriority(value) {
  return APPROVAL_PRIORITIES.includes(value)
}

export function validApprovalAction(value) {
  return APPROVAL_ACTIONS.includes(value)
}

export function validApprovalReference(value) {
  return (
    typeof value === 'string' &&
    value.trim().length >= 3 &&
    value.trim().length <= 100
  )
}
