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
        console.log('Progresso quantidade de paginas lidas ', resposta.data.data)
        this.progressoTotal = resposta.data.data
      } catch (error) {
        console.error('Erro ao carregar progresso total:', error)
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
        console.log('Meu erro de progresso DATA ', data)
        console.log('Meu erro de progresso ', error)
        this.erros = error?.response?.data?.errors ?? []
        return error.response
      }
    },
  },
})
