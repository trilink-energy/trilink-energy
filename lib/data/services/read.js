import { dataQuery } from '../client'

export async function countRecords(table) {
  const { count, error } = await dataQuery(table)
    .select('*', {
      count: 'exact',
      head: true
    })

  if (error) {
    throw new Error(error.message)
  }

  return count || 0
}

export async function listRecords(
  table,
  {
    limit = 50,
    orderBy = 'created_at',
    ascending = false
  } = {}
) {
  const safeLimit = Math.min(
    Math.max(Number(limit) || 50, 1),
    100
  )

  const { data, error } = await dataQuery(table)
    .select('*')
    .order(orderBy, {
      ascending
    })
    .limit(safeLimit)

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}
