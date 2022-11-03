import api from 'src/services/api'

const fetchTreatments = async () => {
  const treatmentsResponse = await api.get('/treatment')

  return treatmentsResponse.data
}

export { fetchTreatments }
