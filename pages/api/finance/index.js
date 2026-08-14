import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import {
  INVOICE_STATUSES,
  PAYMENT_STATUSES,
  TRANSACTION_TYPES
} from '../../../lib/finance/constants'
import {
  validInvoiceStatus,
  validCurrency,
  validFinanceReference,
  validAmount
} from '../../../lib/finance/validation'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const identity = getCEOIdentity(req)

  if (!identity) {
    return res.status(401).json({
      ok: false,
      error: 'CEO_AUTHENTICATION_REQUIRED'
    })
  }

  if (!hasCEOPermission(identity, 'ceo.finance.view')) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      module: 'finance',
      invoiceStatuses: INVOICE_STATUSES,
      paymentStatuses: PAYMENT_STATUSES,
      transactionTypes: TRANSACTION_TYPES
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const body = req.body || {}

  if (!validFinanceReference(body.reference)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_FINANCE_REFERENCE'
    })
  }

  if (!validAmount(body.amount)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_AMOUNT'
    })
  }

  if (
    body.currency &&
    !validCurrency(body.currency)
  ) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_CURRENCY'
    })
  }

  if (
    body.status &&
    !validInvoiceStatus(body.status)
  ) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_INVOICE_STATUS'
    })
  }

  return res.status(201).json({
    ok: true,
    invoice: {
      reference: body.reference.trim(),
      amount: Number(body.amount),
      currency: body.currency || 'GBP',
      status: body.status || 'draft'
    }
  })
}
