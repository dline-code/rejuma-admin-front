import axios from 'axios'

const api = axios.create({
  baseURL: 'https://seahorse-app-vdulm.ondigitalocean.app',
})

export default api
