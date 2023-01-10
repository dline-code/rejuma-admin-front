import api from 'src/services/api'

const postFecthSubject = async (data) => {
  const treatmentsResponse = await api.post('/disciplina/post', data)
  return treatmentsResponse.data
}

const fetchSubjects = async () => {
  const treatmentsResponse = await api.get('/disciplina/listar')
  return treatmentsResponse.data
}

const deleteFetchSubjects = async (id) => {
  const treatmentsResponse = await api.delete(`/disciplina/apagar/${id}`)
  return treatmentsResponse.data
}

export { fetchSubjects, deleteFetchSubjects, postFecthSubject }
