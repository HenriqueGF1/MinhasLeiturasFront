// stores/leituraStore.js
import { defineStore } from 'pinia'
import api from '../api/instanceAxios'

export const useAvaliacoesStore = defineStore('avaliacao', {
  state: () => ({
    avaliacoes: [],
    estaCerregandoAvaliacao: false,
    erros: [],
  }),
  actions: {
    async fetchAvaliacoes() {
      this.estaCerregandoAvaliacao = true
      try {
        const response = await api.get('/leituras/avaliar/pesquisa')
        this.avaliacoes = response.data.data
      } catch (error) {
        console.error('Erro ao carregar avaliacoes:', error)
      } finally {
        this.estaCerregandoAvaliacao = false
      }
    },
  },
})
