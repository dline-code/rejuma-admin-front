import api from 'src/services/api'

const fetchTreatmentSalon = async () => {
  const userId = JSON.parse(String(localStorage.getItem('user-id')))
  const treatmentSalonResponse = await api.get(`treatmentsalon/${userId}`)

  return treatmentSalonResponse.data
}

export { fetchTreatmentSalon }
