export const SYSTEM_MANIFEST = {
  name: 'TriLink',
  platform: 'Integrated Business Platform',

  domains: [
    'Trade',
    'Logistics',
    'Energy',
    'Finance',
    'AI',
    'Risk',
    'Audit'
  ],

  portals: [
    'Customer',
    'Supplier',
    'CEO',
    'Administration'
  ],

  security: [
    'CEO authentication',
    'Customer authentication',
    'Permission checks',
    'HttpOnly sessions',
    'No client-supplied authorization'
  ]
}

export function getSystemManifest() {
  return SYSTEM_MANIFEST
}
