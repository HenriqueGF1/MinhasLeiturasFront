// stores/leituraStore.js
import { defineStore } from 'pinia'
import api from '../api/instanceAxios'

export const useLeituraStore = defineStore('leitura', {
  state: () => ({
    leituras: [],
    estaCerregando: false,
    erros: [],
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
    async cadastrar(data) {
      this.estaCerregando = true
      try {
        const resposta = await api.post(`/leituras/cadastrar`, data)
        console.log('Meu retorno ', resposta)
        return resposta.data
      } catch (error) {
        console.log('Meu retorno error', error)
        this.erros = error.response.data.errors
        return error.response
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
    async progresso(data) {
      // this.estaCerregando = true
      try {
        const resposta = await api.post(`/leituras/progresso`, data)
        console.log('Meu retorno ', resposta)
        return resposta.data
      } catch (error) {
        console.log('Meu retorno error', error)
        this.erros = error.response.data.errors
        return error.response
      } finally {
        // this.estaCerregando = false
      }
    },
    async avaliacao(data) {
      // this.estaCerregando = true
      try {
        const resposta = await api.post(`/leituras/avaliar`, data)
        console.log('Meu retorno ', resposta)
        return resposta.data
      } catch (error) {
        console.log('Meu retorno error', error)
        this.erros = error.response.data.errors
        return error.response
      } finally {
        // this.estaCerregando = false
      }
    },
  },
})
