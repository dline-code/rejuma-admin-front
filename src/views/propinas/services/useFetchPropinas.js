import api from 'src/services/api'

const getfetchPropinasByClass = async (designacao) => {
  const propinasResponse = await api.get(`/propina/listarturma/${designacao}`)
  return propinasResponse.data
}
const postfetchPropinas = async (data) => {
  const propinasResponse = await api.post(`/propina/post`, data)
  return propinasResponse.data
}

const deletefetchPropinas = async (id) => {
  const propinasResponse = await api.delete(`/propina/apagar/${id}`)
  return propinasResponse.data
}

const getClass = async () => {
  const classResponse = await api.get(`/classe/listar`)
  return classResponse.data
}

const getfetchClass = async (designacao) => {
  const classResponse = await api.get(`/usuario/estudanteClasse/${designacao}`)
  return classResponse.data
}

const getfetchPropinasByMonth = async (designacao) => {
  const MonthResponse = await api.get(`/propina/listarMes/${designacao}`)
  return MonthResponse.data
}

const getFecthYear = async () => {
  const yearResponse = await api.get('/anoLetivo/listar')
  return yearResponse.data
}

const getfetchMonth = async () => {
  const MonthResponse = await api.get(`/mes/listar`)
  return MonthResponse.data
}

const getMonths = async () => {
  const MonthResponse = await api.get(`/mes/listar`)
  return MonthResponse.data
}

export {
  getfetchPropinasByClass,
  getClass,
  getfetchClass,
  deletefetchPropinas,
  getfetchMonth,
  getfetchPropinasByMonth,
  getFecthYear,
  getMonths,
  postfetchPropinas,
}
