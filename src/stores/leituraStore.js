// stores/leituraStore.js
import { defineStore } from 'pinia'
import api from '../api/instanceAxios'

export const useLeituraStore = defineStore('leitura', {
  state: () => ({
    leituras: [],
    leiturasUsuario: [],
    leituraAleatoria: null,
    estaCarregando: false,
    erros: [],
  }),
  actions: {
    async fetchLeituras() {
      this.estaCarregando = true
      try {
        const response = await api.get('/leituras')
        this.leituras = response.data.data
      } catch (error) {
        console.error('Erro ao carregar leituras:', error)
      } finally {
        this.estaCarregando = false
      }
    },
    async fetchLeituraAleatoria() {
      this.estaCarregando = true
      try {
        const response = await api.get('/leituras/aleatoria')
        this.leituraAleatoria = response.data.data
      } catch (error) {
        console.error('Erro ao carregar leitura aleatória:', error)
      } finally {
        this.estaCarregando = false
      }
    },
    async fetchLeiturasUsuario() {
      this.estaCarregando = true
      try {
        const response = await api.get('/leituras/usuario')
        console.log('Leituras do Usuario ', response)
        this.leiturasUsuario = response.data.data
      } catch (error) {
        console.error('Erro ao carregar leituras do usuario:', error)
      } finally {
        this.estaCarregando = false
      }
    },
    async cadastrar(data) {
      this.estaCarregando = true
      try {
        const resposta = await api.post(`/leituras/cadastrar`, data)
        return resposta.data
      } catch (error) {
        this.erros = error?.response?.data?.errors ?? []
        return error.response
      } finally {
        this.estaCarregando = false
      }
    },
    async deleteLeitura(id_usuario_leitura) {
      // this.estaCarregando = true
      console.log('Id que eu vou excluir ', id_usuario_leitura)
      try {
        await api.delete(`/leituras/excluir/${id_usuario_leitura}`)
        await this.fetchLeiturasUsuario()
      } catch (error) {
        console.error('Erro ao excluir leitura:', error)
      } finally {
        // this.estaCarregando = false
      }
    },
    async progresso(data) {
      try {
        const resposta = await api.post(`/leituras/progresso`, data)
        return resposta.data
      } catch (error) {
        this.erros = error?.response?.data?.errors ?? []
        return error.response
      }
    },
    async avaliacao(data) {
      try {
        const resposta = await api.post(`/leituras/avaliar`, data)
        return resposta.data
      } catch (error) {
        this.erros = error?.response?.data?.errors ?? []
        return error.response
      }
    },
  },
})
