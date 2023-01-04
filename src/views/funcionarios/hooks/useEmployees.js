import { useEffect, useState } from 'react'
import { fetchUserType } from '../services/useFetchFuncionario'

export function useEmployees() {
  const [role, setRole] = useState([])

  useEffect(async () => {
    const data = await fetchUserType()
    setRole(data)
  }, [])

  return {
    role,
  }
}
