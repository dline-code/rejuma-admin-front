import { useQuery } from 'react-query'
import { getShifts } from '../service/fetchMethods'

export const useShift = (setShifts) => {
  return useQuery('ShiftsData', async () => {
    const data = await getShifts()
    setShifts(data)
    return data
  })
}
