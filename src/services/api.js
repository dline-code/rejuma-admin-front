import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://rejuma.herokuapp.com',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rejuma-token')
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`
  }
  return config
})

export default api
