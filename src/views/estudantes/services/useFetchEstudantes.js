import api from 'src/services/api'

const fetchEstudantes = async () => {
  const estudantesResponse = await api.get('/treatment')

  return estudantesResponse.data
}

export { fetchEstudantes }
