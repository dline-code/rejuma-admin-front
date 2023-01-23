import Swal from 'sweetalert2'
import {
  deleteFetchTurma,
  fetchClass,
  fetchCurso,
  fetchTurma,
  fetchTurno,
  postFecthTurma,
} from '../services/useFetchClass'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function useTurma() {
  const [turmaData, setTurmaData] = useState([])
  const [turnoData, setTurnoData] = useState([])
  const [classData, setClassData] = useState([])
  const [cursoData, setCursoData] = useState([])
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  async function handleDatas() {
    const data = await fetchTurma()
    const turno = await fetchTurno()
    const curso = await fetchCurso()
    const class1 = await fetchClass()
    setCursoData(curso)
    setClassData(class1)
    setTurnoData(turno)
    setTurmaData(data)
    return data
  }

  useEffect(() => {
    handleDatas()
  }, [])

  async function handleDeleteTurma(id) {
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
          await deleteFetchTurma(id)
          Swal.fire('Sucesso', 'Removido com sucesso', 'success')
          handleDatas()
          history.go('/turmas')
        } catch (error) {
          Swal.fire('Erro', `Erro inesperado`, 'error')
        }
      }
    })
  }

  const handlePostTurma = async (data) => {
    setLoading(true)
    try {
      await postFecthTurma(data)
      Swal.fire('Sucesso!', `Inserido com sucesso`, 'success')
      handleDatas()
      setLoading(false)
      history.go('/turmas')
    } catch (error) {
      Swal.fire('Erro!', `Erro inesperdo!`, 'error')
      setLoading(false)
    }
  }
  return {
    handleDatas,
    turmaData,
    classData,
    turnoData,
    cursoData,
    handleDeleteTurma,
    handlePostTurma,
    loading,
    setLoading,
  }
}
