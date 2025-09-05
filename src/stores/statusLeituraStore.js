// stores/leituraStore.js
import { defineStore } from 'pinia'

import api from '../api/instanceAxios'

export const useStatusLeituraStore = defineStore('statusLeitura', {
  state: () => ({
    statusLeitura: [],
    estaCarregandoStatusLeitura: false,
    erros: [],
  }),
  actions: {
    async fetchStatusLeitura() {
      this.estaCarregandoStatusLeitura = true
      try {
        const response = await api.get('/status/leituras')
        this.statusLeitura = response.data.data
      } catch (error) {
        this.erros = error?.response?.data?.errors ?? []
      } finally {
        this.estaCarregandoStatusLeitura = false
      }
    },
  },
})
