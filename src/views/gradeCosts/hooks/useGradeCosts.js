import { getGradeCosts } from '../services/fetchMethods'

const { useQuery } = require('react-query')

export function useGradeCosts(setgradeCosts) {
  return useQuery('getsGradeCostData', async () => {
    const data = await getGradeCosts()
    setgradeCosts(data)
    return data
  })
}
