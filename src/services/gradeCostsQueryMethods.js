import api from 'src/services/api'

export const setNewGradeCost = async (data) => {
  const response = await api.post(`/classe/post`, data)
  return response
}

export const getGradeCosts = async () => {
  const response = await api.get(`/classe/listar`)
  return response
}

export const updateGradeCost = async (id, data) => {
  const response = await api.put(`/classe/atualizar/${id}`, data)
  return response
}

export const deleteGradeCost = async (id) => {
  const response = await api.delete(`/classe/apagar/${id}`)
  return response
}
