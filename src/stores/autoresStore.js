// stores/leituraStore.js
import { defineStore } from 'pinia'
import api from '../api/instanceAxios'

export const useAutoresStore = defineStore('autores', {
  state: () => ({
    autores: [],
    estaCerregandoAutores: false,
    erros: [],
  }),
  actions: {
    async fetchAutores() {
      this.estaCerregandoAutores = true
      try {
        const response = await api.get('/autores')
        console.log('Autor Store Retorno ', response)
        console.log('Autor Store Retorno aaaa', response.data)
        this.autores = response.data
      } catch (error) {
        console.error('Erro ao carregar autores:', error)
      } finally {
        this.estaCerregandoAutores = false
      }
    },
  },
})
