import { dataQuery } from '../client'

export function createRepository(table) {
  return {
    async findById(id) {
      if (!id) {
        throw new Error('RECORD_ID_REQUIRED')
      }

      const { data, error } = await dataQuery(table)
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (error) {
        throw new Error(error.message)
      }

      return data || null
    },

    async count() {
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
  }
}
