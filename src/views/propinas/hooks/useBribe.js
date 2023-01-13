import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import {
  deletefetchPropinas,
  getfetchMonth,
  getfetchPropinasByMonth,
} from '../services/useFetchPropinas'

export function useBribe() {
  const [filteredData, setFilteredData] = useState([])
  const [filterBy, setFilterBy] = useState('mês')
  const [isModalOpen, setIsModalOpen] = useState()
  const [isfilter, setIsFilter] = useState(false)
  const [search, setSearch] = useState('')
  const [monthData, setMonthData] = useState([])
  const history = useHistory()
  const fields = ['mês']

  async function fetchDatas() {
    const data = await getfetchMonth()
    setMonthData(data)
  }
  useEffect(() => {
    fetchDatas()
    if (filterBy === 'mês') {
      handleFilter()
      setFilterBy('mês')
      setIsFilter(true)
      return
    }
  }, [])
  const handleFilter = async (event) => {
    const value = event?.target?.value
    const mes = value ? value : 'Janeiro'
    const data = await getfetchPropinasByMonth(mes)
    setFilteredData(data)
  }

  function searchData(search) {
    const data = filteredData.filter((data) => {
      return data?.estudante?.nome?.toLowerCase().includes(search.toLowerCase())
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
          await deletefetchPropinas(id)
          Swal.fire('Sucesso', 'Removido com sucesso', 'success')
          history.go('/propinas')
        } catch (error) {
          Swal.fire('Erro', `${error?.resonse?.data?.error}`, 'error')
        }
      }
    })
  }

  function handleFilterby(event) {
    if (event?.target.value === null) {
      setIsFilter(false)
      return
    }
    if (event?.target.value === 'mês') {
      setFilterBy('mês')
      setIsFilter(true)
      return
    }
    setIsFilter(false)
  }

  return {
    handleRemove,
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
    monthData,
  }
}
