// stores/leituraStore.js
import { defineStore } from 'pinia'
import api from '../api/instanceAxios'

export const useLeituraStore = defineStore('leitura', {
  state: () => ({
    leituras: [],
    estaCerregando: false,
  }),
  actions: {
    async fetchLeituras() {
      this.estaCerregando = true
      try {
        const response = await api.get('/leituras')
        this.leituras = response.data.data
      } catch (error) {
        console.error('Erro ao carregar leituras:', error)
      } finally {
        this.estaCerregando = false
      }
    },
    async deleteLeitura(id) {
      this.estaCerregando = true
      try {
        await api.delete(`/leituras/excluir/${id}`)
        this.fetchLeituras()
      } catch (error) {
        console.error('Erro ao excluir leitura:', error)
      } finally {
        this.estaCerregando = false
      }
    },
  },
})
