// stores/leituraStore.js
import { defineStore } from 'pinia'

import api from '../api/instanceAxios'

export const useLeituraStore = defineStore('leitura', {
  state: () => ({
    leituras: [],
    leiturasUsuario: [],
    leituraAleatoria: null,
    estaCarregando: false,
    estaCarregandoIsbn: false,
    erros: [],
  }),
  actions: {
    async pesquisarIsbn(isbn) {
      this.estaCarregandoIsbn = true
      try {
        const response01 = await api.get(`/leituras/isbn/${isbn}`)
        const dados01 = response01?.data?.data || null

        if (Array.isArray(dados01) ? dados01.length > 0 : !!dados01) {
          const livro = {
            id_leitura: dados01.id_leitura || '',
            titulo: dados01.titulo || '',
            descricao: dados01.descricao || '',
            capa: dados01.capa || '',
            id_autor: dados01.id_autor || '',
            id_editora: dados01.id_editora || '',
            data_publicacao: dados01.data_publicacao || '',
            qtd_capitulos: dados01.qtd_capitulos || 0,
            qtd_paginas: dados01.qtd_paginas || 0,
            isbn: dados01.isbn || isbn,
            id_genero: dados01.id_genero || '',
          }

          return livro
        }

        const response02 = await api.get(`/leituras/isbn-api/${isbn}`)
        const dados02 = response02?.data?.data?.original?.livro?.volumeInfo || null

        const livro = {
          titulo: dados02?.title || '',
          descricao: dados02?.description || '',
          capa: dados02?.imageLinks?.thumbnail || '',
          nome_autor: dados02?.authors?.[0] || '',
          data_publicacao: dados02?.publishedDate || '',
          qtd_capitulos: null,
          qtd_paginas: dados02?.pageCount || 0,
          isbn: isbn,
          id_genero: '',
        }

        return livro
      } catch (error) {
        console.error('❌ Erro ao carregar leituras:', error?.response?.data || error.message)
        throw error
      } finally {
        this.estaCarregandoIsbn = false
      }
    },
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
        const response = await api.get('/usuario-leitura')
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
        const resposta = await api.post(`/leituras`, data)
        return resposta.data
      } catch (error) {
        this.erros = error?.response?.data?.errors ?? []
        return error.response
      } finally {
        this.estaCarregando = false
      }
    },
    async usuarioCadastrarLeituraExistente(data) {
      this.estaCarregando = true
      try {
        const resposta = await api.post(`/usuario-leitura`, data)
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
      try {
        await api.delete(`/usuario-leitura/${id_usuario_leitura}`)
        await this.fetchLeiturasUsuario()
      } catch (error) {
        console.error('Erro ao excluir leitura:', error)
      } finally {
        // this.estaCarregando = false
      }
    },
  },
})
