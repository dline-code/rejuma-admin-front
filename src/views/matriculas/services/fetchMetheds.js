import api from 'src/services/api'
import { formatDate } from 'src/utils'

export const setEnrollment = async (enrollment) => {
  const { data } = await api.post(`/matricula/post`, enrollment)
  return data
}

export const getEnrollments = async () => {
  const { data } = await api.get('/matricula/listar')
  return data.map((enrollment) => {
    return {
      ...enrollment,
      createdAt: formatDate(enrollment.createdAt),
      dataNascimento: formatDate(enrollment.dataNascimento),
    }
  })
}
