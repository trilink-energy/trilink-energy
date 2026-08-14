import {
  PUBLIC_NAVIGATION,
  PORTAL_NAVIGATION,
  ADMIN_NAVIGATION
} from '../../../lib/navigation/constants'

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
    frontend: 'integrated',
    navigation: {
      public: PUBLIC_NAVIGATION,
      portal: PORTAL_NAVIGATION,
      admin: ADMIN_NAVIGATION
    },
    generated_at: new Date().toISOString()
  })
}
