export function buildAuthenticationStatus({
  ceo,
  customer
}) {
  return {
    ceo: Boolean(ceo),
    customer: Boolean(customer),
    authenticated: Boolean(ceo || customer)
  }
}
