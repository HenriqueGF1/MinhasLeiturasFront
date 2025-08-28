// stores/leituraStore.js
import { defineStore } from 'pinia'
import api from '../api/instanceAxios'

export const useEditorasStore = defineStore('editoras', {
  state: () => ({
    editoras: [],
    estaCarregandoEditoras: false,
    erros: [],
  }),
  actions: {
    async fetchEditoras() {
      this.estaCarregandoEditoras = true
      try {
        const response = await api.get('/editoras')
        console.log('Editora Store Retorno', response)
        this.editoras = response.data
      } catch (error) {
        console.error('Erro ao carregar editoras:', error)
        this.erros = error?.response?.data?.errors ?? []
      } finally {
        this.estaCarregandoEditoras = false
      }
    },
  },
})
