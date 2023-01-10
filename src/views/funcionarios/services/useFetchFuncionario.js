import api from 'src/services/api'

const fetchFuncionarios = async (desc) => {
  const funcionariosResponse = await api.get(`/usuario/listarFuncionario/${desc}`)
  return funcionariosResponse.data
}
const PostFetchFunciarios = async (data) => {
  const funcionariosResponse = await api.post('/usuario/post', data)
  return funcionariosResponse.data
}

const DeleteFetchFunciarios = async (id) => {
  const funcionariosResponse = await api.delete(`/usuario/apagar/${id}`)
  return funcionariosResponse.data
}

const fetchUserType = async () => {
  const userTypeResponse = await api.get('/tipoUsuario/listar')
  return userTypeResponse.data
}

const fetchStateUserId = async () => {
  const stateUserIdResponse = await api.get('/estadoUsuario/listar')
  return stateUserIdResponse.data
}

export {
  fetchFuncionarios,
  PostFetchFunciarios,
  DeleteFetchFunciarios,
  fetchUserType,
  fetchStateUserId,
}
