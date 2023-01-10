import Swal from 'sweetalert2'
import { deleteFetchSubjects, fetchSubjects, postFecthSubject } from '../services/useFetchSubjects'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'
export const subjectContext = React.createContext({})

export function useSubject() {
  const [subjectData, setSubjectData] = useState([])
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
          history.go('/disciplinas')
        } catch (error) {
          Swal.fire('Erro', `Erro inesperado`, 'error')
        }
      }
    })
  }

  const handlePostSubject = async (data) => {
    setLoading(true)
    try {
      await postFecthSubject(data)
      Swal.fire('Sucesso!', `Inserido com sucesso`, 'success')
      handleDatas()
      setLoading(false)
      history.go('/disciplinas')
    } catch (error) {
      console.log(error.response)
      Swal.fire('Erro!', `Erro inesperdo!!`, 'error')
      setLoading(false)
    }
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
