import api from '../../../services/api'

export const session = async (userData) => await api.post('/session', userData)
