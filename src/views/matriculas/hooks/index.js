import { useQuery } from 'react-query'
import { getEnrollments } from '../services/fetchMetheds'

export const useEnrollment = (setMatriculas) => {
  return useQuery('enrollment', async () => {
    const data = await getEnrollments()
    setMatriculas(data)
    return data
  })
}
