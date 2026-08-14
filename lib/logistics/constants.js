export const LOGISTICS_STATUSES = [
  'draft',
  'quoted',
  'booked',
  'pickup_scheduled',
  'in_transit',
  'at_border',
  'customs_clearance',
  'delivered',
  'cancelled'
]

export const SHIPMENT_MODES = [
  'road',
  'rail',
  'air',
  'sea',
  'multimodal'
]

export const SHIPMENT_PRIORITIES = [
  'standard',
  'express',
  'urgent'
]

/*
 * Compatibility alias.
 * Existing API routes use ROUTE_STATUSES.
 */
export const ROUTE_STATUSES = LOGISTICS_STATUSES
