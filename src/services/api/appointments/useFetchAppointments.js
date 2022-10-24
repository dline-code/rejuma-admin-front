import api from '../api'

const fetchAppointments = async () => {
  const appointmentsResponse = await api.get('/schedule')

  return appointmentsResponse.data
}

export { fetchAppointments }
