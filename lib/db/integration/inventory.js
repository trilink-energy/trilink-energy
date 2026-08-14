import { CORE_TABLES } from './constants'

export function getCoreTableInventory() {
  return CORE_TABLES.map(table => ({
    table,
    expected: true,
    status: 'configured'
  }))
}
