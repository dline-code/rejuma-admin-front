import { useEffect, useState } from 'react'
import {
  DeleteFetchFunciarios,
  fetchFuncionarios,
  fetchStateUserId,
  fetchUserType,
} from '../services/useFetchFuncionario'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

export function useEmployees() {
  const [filteredData, setFilteredData] = useState([])
  const [filterBy, setFilterBy] = useState('')
  const [isModalOpen, setIsModalOpen] = useState()
  const [isfilter, setIsFilter] = useState(false)
  const [search, setSearch] = useState('')
  const history = useHistory()
  const [role, setRole] = useState([])
  const [userState, setUserState] = useState([])
  const fields = ['cargo']

  useEffect(async () => {
    const data = await fetchUserType()
    setRole(data)
  }, [])

  useEffect(async () => {
    const data = await fetchStateUserId()
    setUserState(data)
  }, [])

  const handleFilter = async (event) => {
    const { value } = event.target
    const data = await fetchFuncionarios(value)
    setFilteredData(data)
  }

  function searchData(search) {
    const data = filteredData.filter((data) => {
      return data?.nome?.toLowerCase().includes(search.toLowerCase())
    })
    return data
  }

  const handleRemove = (id) => {
    Swal.fire({
      title: 'Tem a certeza que pretende eliminar?',
      text: 'Você não será capaz de reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await DeleteFetchFunciarios(id)
          Swal.fire('Sucesso', 'Removido com sucesso', 'success')
        } catch (error) {
          console.log(error?.response?.data)
          Swal.fire('Erro', `${error?.resonse?.data?.error}`, 'error')
        }
        history.go(0)
      }
    })
  }

  function handleFilterby(event) {
    if (event?.target.value === 'cargo') {
      setFilterBy('cargo')
      setIsFilter(true)
      return
    }
    setIsFilter(false)
  }

  return {
    handleRemove,
    role,
    fields,
    handleFilter,
    filteredData,
    isModalOpen,
    isfilter,
    search,
    searchData,
    handleFilterby,
    filterBy,
    setIsModalOpen,
    setSearch,
    userState,
  }
}
