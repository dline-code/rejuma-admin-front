import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rejuma-token')
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`
  }
  return config
})

export default api
