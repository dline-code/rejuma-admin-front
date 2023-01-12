import api from 'src/services/api'

const getfetchPropinasByClass = async (designacao) => {
  const propinasResponse = await api.get(`/propina/listarturma/${designacao}`)
  return propinasResponse.data
}

const deletefetchPropinas = async (id) => {
  const propinasResponse = await api.delete(`/propina/apagar/${id}`)
  return propinasResponse.data
}

const getfetchClass = async () => {
  const classResponse = await api.get(`/turma/listar`)
  return classResponse.data
}

const getfetchPropinasByMonth = async (designacao) => {
  const MonthResponse = await api.get(`/propina/listarMes/${designacao}`)
  return MonthResponse.data
}

const getfetchMonth = async () => {
  const MonthResponse = await api.get(`/mes/listar`)
  return MonthResponse.data
}

export {
  getfetchPropinasByClass,
  getfetchClass,
  deletefetchPropinas,
  getfetchMonth,
  getfetchPropinasByMonth,
}
