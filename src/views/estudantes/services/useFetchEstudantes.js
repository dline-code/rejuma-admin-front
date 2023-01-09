import api from 'src/services/api'
import { useCallback, useEffect, useState } from 'react'

export function useFetchEstudantes() {
  const [studentDataByClass, setStudentDataByClass] = useState([])
  const [studentDataByTurno, setStudentDataByTurno] = useState([])
  const [fieldsClass, setFieldsClass] = useState([])
  const [fieldsTurno, setFieldsTurno] = useState([])

  async function getDataClass() {
    const data = await api
      .get('/classe/listar')
      .then((data) => data.data)
      .catch((err) => console.log(err))
    setFieldsClass(data)
  }
  async function getDataTurno() {
    const data = await api
      .get('/turno/listar')
      .then((data) => data.data)
      .catch((err) => console.log(err))
    setFieldsTurno(data)
  }

  async function getDataByClass() {
    const data = await api
      .get('/usuario/estudanteClasse')
      .then((data) => data.data)
      .catch((err) => console.log(err))
    setStudentDataByClass(data)
  }

  async function getDataByTurno() {
    const data = await api
      .get('/usuario/estudanteTurno')
      .then((data) => data.data)
      .catch((err) => console.log(err))
    setStudentDataByTurno(data)
  }
  const handleFecthDatas = useCallback(() => {
    getDataTurno()
    getDataClass()
    getDataByClass()
    getDataByTurno()
  }, [])

  useEffect(() => {
    handleFecthDatas()
  }, [handleFecthDatas])

  return {
    getDataClass,
    fieldsClass,
    fieldsTurno,
    setStudentDataByClass,
    setStudentDataByTurno,
    studentDataByClass,
    studentDataByTurno,
    handleFecthDatas,
  }
}
