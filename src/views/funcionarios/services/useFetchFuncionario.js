import api from 'src/services/api'

const fetchFuncionarios = async () => {
  const funcionariosResponse = await api.get('/treatment')

  return funcionariosResponse.data
}

export { fetchFuncionarios }
