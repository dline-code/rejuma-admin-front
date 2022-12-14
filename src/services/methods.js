import api from './api'

export const getUsersType = async () => {
  const response = await api.get(`/tipoUsuario/listar`)
  return response.data
}

export const getCourses = async () => {
  const response = await api.get(`/curso/listar`)
  return response.data
}

export const getGrade = async () => {
  const response = await api.get(`/classe/listar`)
  return response.data
}

export const getClasses = async () => {
  const response = await api.get(`/turma/listar`)
  return response.data
}

export const getShiftS = async () => {
  const response = await api.get(`/turno/listar`)
  return response.data
}
