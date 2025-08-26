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
        const response = await api.get('/generos')
        console.log('Genero Store Retorno ', response.data)
        this.generos = response.data
      } catch (error) {
        console.error('Erro ao carregar generos:', error)
      } finally {
        this.estaCerregandoGenero = false
      }
    },
  },
})
