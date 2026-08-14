export const LOGISTICS_INTEGRATIONS = {
  customer_portal: {
    enabled: true,
    purpose: 'customer shipment visibility'
  },
  supplier_portal: {
    enabled: true,
    purpose: 'supplier shipment coordination'
  },
  trade: {
    enabled: true,
    purpose: 'trade order to shipment'
  },
  finance: {
    enabled: true,
    purpose: 'shipment and invoice linkage'
  },
  audit: {
    enabled: true,
    purpose: 'logistics activity tracking'
  }
}

export function getLogisticsIntegrationStatus() {
  return LOGISTICS_INTEGRATIONS
}
