import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://seahorse-app-vdulm.ondigitalocean.app',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rejuma-token')
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`
  }
  return config
})

export default api
