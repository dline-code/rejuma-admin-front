import api from 'src/services/api'

const postFecthTurma = async (data) => {
  const treatmentsResponse = await api.post('/turma/post', data)
  return treatmentsResponse.data
}

const fetchTurma = async () => {
  const treatmentsResponse = await api.get('/turma/listar')
  return treatmentsResponse.data
}

const deleteFetchTurma = async (id) => {
  const treatmentsResponse = await api.delete(`/turma/apagar/${id}`)
  return treatmentsResponse.data
}
const fetchTurno = async () => {
  const treatmentsResponse = await api.get('/turno/listar')
  return treatmentsResponse.data
}
const fetchClass = async () => {
  const treatmentsResponse = await api.get('/classe/listar')
  return treatmentsResponse.data
}
const fetchCurso = async () => {
  const treatmentsResponse = await api.get('/curso/listar')
  return treatmentsResponse.data
}

export { fetchTurma, deleteFetchTurma, postFecthTurma, fetchTurno, fetchClass, fetchCurso }
