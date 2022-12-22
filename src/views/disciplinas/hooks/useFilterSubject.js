import { useContext, useState } from 'react'
import { subjectContext } from './useSubject'

export function useFilterSubject() {
  const { subjectData, filterBy, setFilterBy } = useContext(subjectContext)
  const fields = ['disciplina', 'descrição']
  const [searching, setSearching] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  function searchBySubject(event) {
    setSearching(true)
    const { value } = event?.target
    if (!value?.length) {
      setSearching(false)
      return
    }
    if (filterBy === 'disciplina') {
      const searchValue = value?.toLowerCase()
      console.log(subjectData)
      const newData = subjectData?.filter((item) => item?.nome.toLowerCase().includes(searchValue))
      console.log(newData)
      setFilteredData(newData)
    }
  }

  return {
    searchBySubject,
    fields,
    filteredData,
    filterBy,
    searching,
    setSearching,
    setFilterBy,
  }
}
