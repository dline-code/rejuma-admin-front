import api from 'src/services/api'

export const setNewGradeCost = async (data) => {
  const response = await api.post(`/classe/post`, data)
  return response.data
}

export const getGradeCosts = async () => {
  const response = await api.get(`/classe/listar`)
  return response.data
}

export const updateGradeCost = async (id, data) => {
  const response = await api.put(`/classe/atualizar/${id}`, data)
  return response.data
}

export const deleteGradeCost = async (id) => {
  const response = await api.delete(`/classe/apagar/${id}`)
  return response.data
}
