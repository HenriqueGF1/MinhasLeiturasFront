// stores/leituraStore.js
import { defineStore } from 'pinia'

import api from '../api/instanceAxios'

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    usaurio: [],
    estaCarregandoUsuario: false,
    erros: [],
    logado: !!localStorage.getItem('token'),
  }),
  actions: {
    async logout() {
      try {
        const resposta = await api.get('/usuario/logout')
        localStorage.removeItem('token')
        this.logado = false
        return resposta.data
      } catch (error) {
        this.erros = error?.response?.data?.errors ?? []
        this.logado = false
        return error.response
      }
    },
    async login(data) {
      try {
        const response = await api.post('/usuario/login', data)
        const token = response.data.authorisation.token
        localStorage.setItem('token', token)
        this.logado = true
        return response.data
      } catch (error) {
        this.erros = error?.response?.data?.errors ?? []
        this.logado = true
        return error.response
      }
    },
  },
})
