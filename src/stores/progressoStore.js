// stores/leituraStore.js
import { defineStore } from 'pinia'
import api from '../api/instanceAxios'

export const useProgressoStore = defineStore('progresso', {
  state: () => ({
    progressoTotal: [],
    estaCarregando: false,
    erros: [],
  }),
  actions: {
    async fetchProgressoTotal(data) {
      this.estaCarregando = true
      try {
        const resposta = await api.post(`/progresso/total`, data)
        this.progressoTotal = resposta.data
      } catch (error) {
        console.error('Erro ao carregar progresso total:', error)
        this.progressoTotal = []
      } finally {
        this.estaCarregando = false
      }
    },
  },
})
