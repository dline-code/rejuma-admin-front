import { useContext, useState } from 'react'
import { subjectContext } from './useSubject'

export function useFilterSubject() {
  const [filteredData, setFilteredData] = useState([])
  const { subjectData } = useContext(subjectContext)
  const fields = ['disciplina', 'descrição']
  const [filterBy, setFilterBy] = useState('')
  const [searching, setSearching] = useState(false)

  function handlefilterBy(event) {
    const { value } = event.target
    console.log(value)
    setFilterBy(value)
    if (filterBy === null) setFilteredData(null)
  }

  function searchBySubject(event) {
    setSearching(true)
    console.log(filterBy)
    if (filterBy === null) {
      setSearching(false)
      return
    }
    if (!filterBy.length) return
    const { value } = event.target
    if (!value.length) {
      setSearching(false)
      setFilteredData(null)
      return
    }
    const searchValue = value.toLowerCase()
    console.log(searchValue)
    if (filterBy === 'disciplina') {
      console.log(subjectData)
      const newData = subjectData?.filter((item) => item?.nome.toLowerCase().includes(searchValue))
      console.log(newData)
      setFilteredData(newData)
    }
  }

  return {
    searchBySubject,
    filteredData,
    fields,
    searching,
    setSearching,
    setFilterBy,
    handlefilterBy,
  }
}
