// stores/leituraStore.js
import { defineStore } from 'pinia'
import api from '../api/instanceAxios'

export const useEditorasStore = defineStore('editoras', {
  state: () => ({
    editoras: [],
    estaCerregandoEditoras: false,
    erros: [],
  }),
  actions: {
    async fetchEditoras() {
      this.estaCerregandoEditoras = true
      try {
        const response = await api.get('/editoras')
        console.log('Editora Store Retorno ', response)
        this.editoras = response.data
      } catch (error) {
        console.error('Erro ao carregar editoras:', error)
      } finally {
        this.estaCerregandoEditoras = false
      }
    },
  },
})
