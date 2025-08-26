// stores/leituraStore.js
import { defineStore } from 'pinia'
import api from '../api/instanceAxios'

export const useProgressoStore = defineStore('progresso', {
  state: () => ({
    progressoTotal: [],
    estaCerregando: false,
    erros: [],
  }),
  actions: {
    async fetchProgressoTotal(data) {
      this.estaCerregando = true
      try {
        const resposta = await api.post(`/leituras/progresso/total`, data)
        this.progressoTotal = resposta.data
      } catch (error) {
        console.error('Erro ao carregar progresso total:', error)
        this.progressoTotal = []
      } finally {
        this.estaCerregando = false
      }
    },
  },
})
