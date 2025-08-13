<script setup>
import { reactive, ref } from 'vue'
import api from '../../api/instanceAxios'
import ErroMensagemValidacaoForm from '../../components/ErroMensagemValidacaoForm.vue'

const leitura = reactive({
  titulo: '',
  descricao: '',
  capa: '',
  descricao_editora: '',
  nome_autor: '',
  data_publicacao: '',
  qtd_capitulos: '',
  qtd_paginas: '',
  isbn: '',
  data_registro: '',
  id_usuario: 1,
  id_status_leitura: 2,
  id_genero: [],
})

const erros = reactive({
  geral: [],
  titulo: [],
  descricao: [],
  capa: [],
  descricao_editora: [],
  nome_autor: [],
  data_publicacao: [],
  qtd_capitulos: [],
  qtd_paginas: [],
  isbn: [],
  data_registro: [],
  id_usuario: [],
  id_status_leitura: [],
  id_genero: [],
})

const carregar = ref(false)

const cadastrarLeitura = async () => {
  carregar.value = true
  erros.geral = []
  Object.keys(erros).forEach((key) => {
    if (key !== 'geral') erros[key] = []
  })

  try {
    const response = await api.post('/leituras/cadastrar', leitura)
    console.log('Leitura cadastrada com sucesso:', response)
  } catch (error) {
    console.error('Erro ao cadastrar leitura:', error)

    if (error.response?.status === 500) {
      erros.geral.push('Erro. Tente novamente mais tarde.')
    } else if (error.response?.data?.errors) {
      const dataErrors = error.response.data.errors
      Object.keys(dataErrors).forEach((key) => {
        erros[key] = dataErrors[key] ?? []
      })
    } else {
      erros.geral.push('Ocorreu um erro inesperado.')
    }
  } finally {
    carregar.value = false
  }
}
</script>

<template>
  <div class="columns is-centered is-vcentered aa" style="height: 100vh">
    <div class="column is-4">
      <div class="box">
        <h1 class="title has-text-centered">Cadastrar Leitura</h1>

        <!-- Erros gerais -->
        <div v-if="erros.geral.length" class="notification is-danger">
          <ErroMensagemValidacaoForm :erros="erros.geral" />
        </div>

        <form @submit.prevent="cadastrarLeitura">
          <div class="field">
            <label class="label" for="titulo">Título</label>
            <div class="control">
              <input
                id="titulo"
                type="text"
                v-model="leitura.titulo"
                class="input"
                :class="{ 'is-danger': erros.titulo.length }"
              />
            </div>
            <p v-if="erros.titulo.length">
              <ErroMensagemValidacaoForm :erros="erros.titulo" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="descricao">Descrição</label>
            <div class="control">
              <textarea
                id="descricao"
                v-model="leitura.descricao"
                class="textarea"
                :class="{ 'is-danger': erros.descricao.length }"
              ></textarea>
            </div>
            <p v-if="erros.descricao.length">
              <ErroMensagemValidacaoForm :erros="erros.descricao" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="capa">URL da Capa</label>
            <div class="control">
              <input
                id="capa"
                type="text"
                v-model="leitura.capa"
                class="input"
                :class="{ 'is-danger': erros.capa.length }"
              />
            </div>
            <p v-if="erros.capa.length">
              <ErroMensagemValidacaoForm :erros="erros.capa" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="descricao_editora">Editora</label>
            <div class="control">
              <input
                id="descricao_editora"
                type="text"
                v-model="leitura.descricao_editora"
                class="input"
                :class="{ 'is-danger': erros.descricao_editora.length }"
              />
            </div>
            <p v-if="erros.descricao_editora.length">
              <ErroMensagemValidacaoForm :erros="erros.descricao_editora" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="nome_autor">Autor</label>
            <div class="control">
              <input
                id="nome_autor"
                type="text"
                v-model="leitura.nome_autor"
                class="input"
                :class="{ 'is-danger': erros.nome_autor.length }"
              />
            </div>
            <p v-if="erros.nome_autor.length">
              <ErroMensagemValidacaoForm :erros="erros.nome_autor" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="data_publicacao">Data de Publicação</label>
            <div class="control">
              <input
                id="data_publicacao"
                type="date"
                v-model="leitura.data_publicacao"
                class="input"
                :class="{ 'is-danger': erros.data_publicacao.length }"
              />
            </div>
            <p v-if="erros.data_publicacao.length">
              <ErroMensagemValidacaoForm :erros="erros.data_publicacao" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="qtd_capitulos">Quantidade de Capítulos</label>
            <div class="control">
              <input
                id="qtd_capitulos"
                type="number"
                v-model="leitura.qtd_capitulos"
                class="input"
                :class="{ 'is-danger': erros.qtd_capitulos.length }"
              />
            </div>
            <p v-if="erros.qtd_capitulos.length">
              <ErroMensagemValidacaoForm :erros="erros.qtd_capitulos" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="qtd_paginas">Quantidade de Páginas</label>
            <div class="control">
              <input
                id="qtd_paginas"
                type="number"
                v-model="leitura.qtd_paginas"
                class="input"
                :class="{ 'is-danger': erros.qtd_paginas.length }"
              />
            </div>
            <p v-if="erros.qtd_paginas.length">
              <ErroMensagemValidacaoForm :erros="erros.qtd_paginas" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="isbn">ISBN</label>
            <div class="control">
              <input
                id="isbn"
                type="text"
                v-model="leitura.isbn"
                class="input"
                :class="{ 'is-danger': erros.isbn.length }"
              />
            </div>
            <p v-if="erros.isbn.length">
              <ErroMensagemValidacaoForm :erros="erros.isbn" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="data_registro">Data de Registro</label>
            <div class="control">
              <input
                id="data_registro"
                type="date"
                v-model="leitura.data_registro"
                class="input"
                :class="{ 'is-danger': erros.data_registro.length }"
              />
            </div>
            <p v-if="erros.data_registro.length">
              <ErroMensagemValidacaoForm :erros="erros.data_registro" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="id_status_leitura">Status de Leitura</label>
            <div class="control">
              <div class="select">
                <select
                  id="id_status_leitura"
                  v-model="leitura.id_status_leitura"
                  :class="{ 'is-danger': erros.id_status_leitura.length }"
                >
                  <option value="1">Não Iniciado</option>
                  <option value="2">Em Andamento</option>
                  <option value="3">Concluído</option>
                </select>
              </div>
            </div>
            <p v-if="erros.id_status_leitura.length">
              <ErroMensagemValidacaoForm :erros="erros.id_status_leitura" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="id_genero">Gêneros</label>
            <div class="control">
              <div class="select" multiple>
                <select
                  id="id_genero"
                  v-model="leitura.id_genero"
                  :class="{ 'is-danger': erros.id_genero.length }"
                >
                  <option value="6">Mistério</option>
                  <option value="10">Suspense</option>
                </select>
              </div>
            </div>
            <p v-if="erros.id_genero.length">
              <ErroMensagemValidacaoForm :erros="erros.id_genero" />
            </p>
          </div>

          <div class="field">
            <div class="control">
              <button type="submit" class="button is-primary is-fullwidth" :disabled="carregar">
                {{ carregar ? 'Enviando...' : 'Cadastrar' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aa {
  margin: 300px;
}
</style>
