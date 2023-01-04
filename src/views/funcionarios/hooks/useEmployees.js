import { useEffect, useState } from 'react'
import { fetchUserType } from '../services/useFetchFuncionario'

export function useEmployees() {
  const [role, setRole] = useState([])

  useEffect(async () => {
    const data = await fetchUserType()
    console.log(data)
    setRole(data)
  }, [])

  return {
    role,
  }
}
