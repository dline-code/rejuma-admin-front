import axios from 'axios'

const fetchAddTurno = async (data) => {
  const turnoResponse = await axios.get('https://rejuma.herokuapp.com/turno/post', data)

  return turnoResponse.data
}

export { fetchAddTurno }
