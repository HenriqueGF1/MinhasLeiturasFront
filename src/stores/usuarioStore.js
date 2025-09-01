// stores/leituraStore.js
import { defineStore } from 'pinia'

import api from '../api/instanceAxios'

export const useUsuarioStore = defineStore('usuario', {
  state: () => ({
    usaurio: [],
    estaCarregandoUsuario: false,
    erros: [],
    logado: !!localStorage.getItem('token'), // inicializa baseado no token
  }),
  actions: {
    async logout() {
      try {
        const resposta = await api.get('/usuario/logout')
        console.log('Minha resposta de usuario ', resposta)
        localStorage.removeItem('token')
        this.logado = false
        return resposta.data
      } catch (error) {
        console.log('Meu erro de usuario ', error)
        this.erros = error?.response?.data?.errors ?? []
        this.logado = false
        return error.response
      }
    },
    async login(data) {
      console.log('Meu dados de login ', data)
      try {
        const response = await api.post('/usuario/login', data)
        const token = response.data.authorisation.token
        localStorage.setItem('token', token)
        console.log('Login bem-sucedido:', response)
        this.logado = true
        return response.data
      } catch (error) {
        console.log('Meu erro de usuario ', error)
        this.erros = error?.response?.data?.errors ?? []
        this.logado = true
        return error.response
      }
    },
  },
})
