import { useContext } from 'react'
import { subjectContext } from './useSubject'

export function useFilterSubject() {
  const { subjectData, filterBy, setFilterBy } = useContext(subjectContext)
  const fields = ['disciplina', 'descrição']

  function searchBySubject(search) {
    if (!search?.length) {
      return
    }
    if (filterBy === 'disciplina') {
      const searchValue = search?.toLowerCase()
      const newData = subjectData?.filter((item) => item?.nome.toLowerCase().includes(searchValue))
      return newData
    }
  }

  return {
    searchBySubject,
    fields,
    filterBy,
    setFilterBy,
  }
}
