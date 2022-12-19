import api from 'src/services/api'

const getfetchFuncionarios = async () => {
  const funcionariosResponse = await api.get('/tipoUsuario/listar')
  return funcionariosResponse.data
}
const postfetchFuncionarios = async (data) => {
  const funcionariosResponse = await api.post('/tipoUsuario/post', data)
  return funcionariosResponse.data
}
const deletefetchFuncionarios = async (id) => {
  const funcionariosResponse = await api.delete(`/tipoUsuario/apagar/${id}`)
  return funcionariosResponse.data
}
const updatefetchFuncionarios = async (id, data) => {
  const funcionariosResponse = await api.put(`/tipoUsuario/put/${id}`, data)
  return funcionariosResponse.data
}

export {
  getfetchFuncionarios,
  postfetchFuncionarios,
  deletefetchFuncionarios,
  updatefetchFuncionarios,
}
