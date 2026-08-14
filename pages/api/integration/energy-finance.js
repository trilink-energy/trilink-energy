import {
  getEnergyFinanceFlow
} from '../../../lib/integration/energy-finance'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  return res.status(200).json({
    ok: true,
    integration: 'energy_finance',
    flow: getEnergyFinanceFlow()
  })
}
