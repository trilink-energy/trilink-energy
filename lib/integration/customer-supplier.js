export const CUSTOMER_SUPPLIER_LINKS = [
  {
    module: 'customer',
    connects_to: ['trade', 'finance', 'support']
  },
  {
    module: 'supplier',
    connects_to: ['trade', 'logistics', 'finance']
  }
]

export function getCustomerSupplierLinks() {
  return CUSTOMER_SUPPLIER_LINKS
}
