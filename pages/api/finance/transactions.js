import { getCEOIdentity } from '../../../lib/ceo/auth'
import { hasCEOPermission } from '../../../lib/ceo/security'
import {
  validTransactionType,
  validCurrency,
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

  const permission =
    req.method === 'GET'
      ? 'ceo.finance.view'
      : 'ceo.finance.approve'

  if (!hasCEOPermission(identity, permission)) {
    return res.status(403).json({
      ok: false,
      error: 'CEO_PERMISSION_REQUIRED'
    })
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      transactions: []
    })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST'])

    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  const body = req.body || {}

  if (!validAmount(body.amount)) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_AMOUNT'
    })
  }

  if (
    !validTransactionType(body.type)
  ) {
    return res.status(400).json({
      ok: false,
      error: 'INVALID_TRANSACTION_TYPE'
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

  return res.status(201).json({
    ok: true,
    transaction: {
      type: body.type,
      amount: Number(body.amount),
      currency: body.currency || 'GBP'
    }
  })
}
