import axios from 'axios'

const api = axios.create({
  baseURL: 'https://zuri-api.herokuapp.com',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('zuri-token')
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`
  }
  return config
})

export default api
