import axios from 'axios'

const fetchTurnos = async () => {
  const turnosResponse = await axios.get('https://rejuma.herokuapp.com/turno/listar')

  return turnosResponse.data
}

export { fetchTurnos }
