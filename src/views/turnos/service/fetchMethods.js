import api from '../../../services/api'

export const setNewShifts = async (data) => {
  const response = await api.post(`/turno/post`, data)
  return response.data
}

export const getShifts = async () => {
  const response = await api.get(`/turno/listar`)
  return response.data
}

export const updateShift = async (id, data) => {
  const response = await api.put(`/turno/atualizar/${id}`, data)
  return response.data
}

export const deleteShift = async (id) => {
  const response = await api.delete(`/turno/apagar/${id}`)
  return response.data
}
