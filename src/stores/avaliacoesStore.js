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
        const response = await api.get('/avaliacoes')
        console.log('avaliacoes ', response)
        console.log('avaliacoes ', response.data.data)
        this.avaliacoes = response.data.data
      } catch (error) {
        console.error('Erro ao carregar avaliacoes:', error)
        this.erros = error?.response?.data?.errors ?? []
      } finally {
        this.estaCarregandoAvaliacao = false
      }
    },
    async avaliar(data) {
      // this.estaCarregandoAvaliacao = true
      try {
        const resposta = await api.post(`/avaliacoes`, data)
        console.log('Minha resposta ', resposta)
        return resposta.data
      } catch (error) {
        this.erros = error?.response?.data?.errors ?? []
      } finally {
        // this.estaCarregandoAvaliacao = false
      }
    },
    async deleteAvaliacaoLeitura(id_avaliacao_leitura) {
      // this.estaCarregandoAvaliacao = true
      try {
        await api.delete(`/avaliacoes/${id_avaliacao_leitura}`)
        await this.fetchAvaliacoes()
      } catch (error) {
        console.error('Erro ao excluir avaliação leitura:', error)
      } finally {
        // this.estaCarregandoAvaliacao = false
      }
    },
  },
})
