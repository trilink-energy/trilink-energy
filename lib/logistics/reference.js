import crypto from 'crypto'

export function generateShipmentReference() {
  return `SHP-${Date.now()}-${crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase()}`
}

export function generateTrackingReference() {
  return `TRK-${Date.now()}-${crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase()}`
}

export function generateRouteReference() {
  return `RTE-${Date.now()}-${crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase()}`
}
