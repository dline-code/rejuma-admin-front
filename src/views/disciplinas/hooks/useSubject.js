import Swal from 'sweetalert2'
import { deleteFetchSubjects, fetchSubjects, postFecthSubject } from '../services/useFetchSubjects'
import { useHistory } from 'react-router-dom'
import React, { useContext, useState } from 'react'
export const subjectContext = React.createContext({})

export function SubjectContextProvider({ children }) {
  const [subjectData, setSubjectData] = useState([])
  const [filterBy, setFilterBy] = useState([])
  const [inputFields, setInputFields] = useState({})
  const [isEdting, setIsEdting] = useState(false)

  return (
    <subjectContext.Provider
      value={{
        subjectData,
        inputFields,
        isEdting,
        setIsEdting,
        setInputFields,
        setSubjectData,
        filterBy,
        setFilterBy,
      }}
    >
      {children}
    </subjectContext.Provider>
  )
}

export function useSubject() {
  const { subjectData, setSubjectData } = useContext(subjectContext)
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  async function handleDatas() {
    const data = await fetchSubjects()
    setSubjectData(data)
    return data
  }

  async function handleDeleteSubject(id) {
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
          await deleteFetchSubjects(id)
          Swal.fire('Sucesso', 'Removido com sucesso', 'success')
          handleDatas()
        } catch (error) {
          console.log(error?.response?.data)
          Swal.fire('Erro', `${error?.resonse?.data?.error}`, 'error')
        }
        history.go('/disciplinas')
      }
    })
  }

  const handlePostSubject = async (data) => {
    console.log(data)
    setLoading(true)
    try {
      await postFecthSubject(data)
      Swal.fire('Sucesso!', `Inserido com sucesso`, 'success')
      handleDatas()
      setLoading(false)
    } catch (error) {
      console.log(error.response)
      Swal.fire('Erro!', `${error?.response?.data.error}`, 'error')
      setLoading(false)
    }
    history.go('/disciplinas')
  }
  return {
    handleDatas,
    subjectData,
    handleDeleteSubject,
    handlePostSubject,
    loading,
    setLoading,
  }
}
