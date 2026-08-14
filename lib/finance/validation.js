import {
  INVOICE_STATUSES,
  PAYMENT_STATUSES,
  TRANSACTION_TYPES,
  CURRENCIES
} from './constants'

export function validInvoiceStatus(value) {
  return INVOICE_STATUSES.includes(value)
}

export function validPaymentStatus(value) {
  return PAYMENT_STATUSES.includes(value)
}

export function validTransactionType(value) {
  return TRANSACTION_TYPES.includes(value)
}

export function validCurrency(value) {
  return CURRENCIES.includes(value)
}

export function validFinanceReference(value) {
  return (
    typeof value === 'string' &&
    value.trim().length >= 3 &&
    value.trim().length <= 100
  )
}

export function validAmount(value) {
  const amount = Number(value)

  return (
    Number.isFinite(amount) &&
    amount >= 0 &&
    amount <= 100000000000
  )
}
