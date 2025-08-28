// stores/leituraStore.js
import { defineStore } from 'pinia'
import api from '../api/instanceAxios'

export const useAvaliacoesStore = defineStore('avaliacao', {
  state: () => ({
    avaliacoes: [],
    estaCarregandoAvaliacao: false,
    erros: [],
  }),
  actions: {
    async fetchAvaliacoes() {
      this.estaCarregandoAvaliacao = true
      try {
        const response = await api.get('/leituras/avaliar/pesquisa')
        this.avaliacoes = response.data.data
      } catch (error) {
        console.error('Erro ao carregar avaliacoes:', error)
        this.erros = error?.response?.data?.errors ?? []
      } finally {
        this.estaCarregandoAvaliacao = false
      }
    },
  },
})
