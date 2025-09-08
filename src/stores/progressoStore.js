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
        console.log('Resposta progress ', resposta)
        this.progressoTotal = resposta.data.data
      } catch (error) {
        this.progressoTotal = []
      } finally {
        this.estaCarregando = false
      }
    },
    async progressoCadastrar(data) {
      try {
        const resposta = await api.post(`/progresso`, data)
        return resposta.data
      } catch (error) {
        this.erros = error?.response?.data?.errors ?? []
        return error.response
      }
    },
  },
})
