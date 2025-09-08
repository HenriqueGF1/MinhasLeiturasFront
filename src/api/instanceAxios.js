import router from '@/router'
import { useUsuarioStore } from '@/stores/usuarioStore'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      const usuarioStore = useUsuarioStore()
      usuarioStore.logado = false

      if (router.currentRoute.value.name !== 'leituras') {
        router.push({ name: 'login' })
      }
    }

    return Promise.reject(error)
  },
)

export default api
