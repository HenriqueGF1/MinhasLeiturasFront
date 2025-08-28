// stores/leituraStore.js
import { defineStore } from 'pinia'
import api from '../api/instanceAxios'

export const useAutoresStore = defineStore('autores', {
  state: () => ({
    autores: [],
    estaCarregandoAutores: false,
    erros: [],
  }),
  actions: {
    async fetchAutores() {
      this.estaCarregandoAutores = true
      try {
        const response = await api.get('/autores')
        console.log('Autor Store Retorno', response)
        console.log('Autor Store Retorno aaaa', response.data)
        this.autores = response.data
      } catch (error) {
        console.error('Erro ao carregar autores:', error)
        this.erros = error?.response?.data?.errors ?? []
      } finally {
        this.estaCarregandoAutores = false
      }
    },
  },
})
