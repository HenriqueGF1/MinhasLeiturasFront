// stores/leituraStore.js
import { defineStore } from 'pinia'

import api from '../api/instanceAxios'

export const useGeneroLeituraStore = defineStore('genero', {
  state: () => ({
    generos: [],
    estaCarregandoGenero: false,
    erros: [],
  }),
  actions: {
    async fetchGeneros() {
      this.estaCarregandoGenero = true
      try {
        const response = await api.get('/generos')
        this.generos = response.data.data
      } catch (error) {
        console.error('Erro ao carregar generos:', error)
        this.erros = error?.response?.data?.errors ?? []
      } finally {
        this.estaCarregandoGenero = false
      }
    },
  },
})
