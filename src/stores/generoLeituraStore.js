// stores/leituraStore.js
import { defineStore } from 'pinia'
import api from '../api/instanceAxios'

export const useGeneroLeituraStore = defineStore('genero', {
  state: () => ({
    generos: [],
    estaCerregandoGenero: false,
    erros: [],
  }),
  actions: {
    async fetchGeneros() {
      this.estaCerregandoGenero = true
      try {
        const response = await api.get('/leituras')
        console.log('DO STORE RETONRO  ', response)
        this.generos = response.data.data
      } catch (error) {
        console.error('Erro ao carregar generos:', error)
      } finally {
        this.estaCerregandoGenero = false
      }
    },
  },
})
