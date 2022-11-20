import React, { useState } from 'react'
import { useFetchEstudantes } from '../services/useFetchEstudantes'

export function useFilterDataOfStudent() {
  const { studentDataByClass, studentDataByTurno } = useFetchEstudantes()
  const [filteredData, setFilteredData] = useState([])
  const [filterBy, setFilterBy] = useState('')
  const [isModalOpen, setIsModalOpen] = useState()
  const fields = ['Classe', 'Período']
  const [searching, setSearching] = useState(false)
  const [studentData, setStudentData] = useState([])

  function FilterByClass(event) {
    if (filterBy === null) return
    if (!filterBy.length) return
    const { value } = event.target
    if (!value.length) return
    const searchValue = value.toLowerCase()
    if (filterBy === 'Classe') {
      const newData = studentDataByClass.filter(
        (item) => item.classe?.classe.toLowerCase() === searchValue,
      )
      setFilteredData(newData)
    }
  }
  function handlefilterBy(event) {
    const { value } = event.target
    setFilterBy(value)
    if (filterBy === null) setFilteredData(null)
  }

  function FilterByTurno(event) {
    if (filterBy === null) return
    if (!filterBy.length) return
    const { value } = event.target
    if (!value.length) return
    const searchValue = value.toLowerCase()
    if (filterBy === 'Período') {
      const newData = studentDataByTurno?.filter(
        (item) => item?.turno?.designacao.toLowerCase() === searchValue,
      )
      setFilteredData(newData)
    }
  }
  const searchByName = (event) => {
    setSearching(true)
    const { value } = event.target
    const searchValue = value.toLowerCase()
    if (!value.trim().length) setSearching(false)
    const data = filteredData?.filter((item) => item.nome.toLowerCase().includes(searchValue))
    setStudentData(data)
  }
  return {
    FilterByTurno,
    FilterByClass,
    fields,
    filteredData,
    filterBy,
    isModalOpen,
    setIsModalOpen,
    setFilterBy,
    setFilteredData,
    handlefilterBy,
    studentData,
    searching,
    searchByName,
  }
}
