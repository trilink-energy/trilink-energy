import {
  databaseConfig,
  isDatabaseConfigured
} from '../../../lib/db/config'

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')

  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'METHOD_NOT_ALLOWED'
    })
  }

  /*
   * This endpoint reports configuration state only.
   * It deliberately does not expose credentials.
   */

  return res.status(200).json({
    ok: true,

    database: {
      configured: isDatabaseConfigured(),
      provider: databaseConfig.provider,
      urlConfigured: databaseConfig.urlConfigured,
      anonKeyConfigured: databaseConfig.anonKeyConfigured,
      serviceKeyConfigured: databaseConfig.serviceKeyConfigured
    },

    message: isDatabaseConfigured()
      ? 'Database configuration detected.'
      : 'Database provider is not configured yet.'
  })
}
