import api from 'src/services/api'

export const setNewCourse = async (data) => {
  const response = await api.post(`/curso/post`, data)
  return response
}

export const getCourses = async () => {
  const response = await api.get(`/curso/listar`)
  return response
}

export const getCourse = async (id) => {
  const response = await api.get(`/curso/listar/${id}`)
  return response
}

export const updateCourse = async (id, data) => {
  const response = await api.put(`/curso/atualizar/${id}`, data)
  return response
}

export const deleteCourse = async (id) => {
  const response = await api.delete(`/curso/apagar/${id}`)
  return response
}

export const getCategoriesCourses = async () => {
  const response = await api.get(`/categoriaCurso/listar`)
  return response.data
}
