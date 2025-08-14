<script setup>
import { reactive, onMounted } from 'vue'
import ErroMensagemValidacaoForm from '../../components/ErroMensagemValidacaoForm.vue'
// import Carregando from '../../components/Carregando.vue'
import { useLeituraStore } from '@/stores/leituraStore'
import { useGeneroLeituraStore } from '@/stores/generoLeituraStore'

const leituraStore = useLeituraStore()
const generoStore = useGeneroLeituraStore()

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
  id_usuario: null,
  id_status_leitura: null,
  id_genero: null,
})

const novosErros = reactive({})

const generos = reactive({})

onMounted(() => {
  generoStore.fetchGeneros()
})

console.log('Response ', generos)

const cadastrarLeitura = async () => {
  Object.assign(novosErros, {})

  const response = await leituraStore.cadastrar(leitura)

  Object.assign(novosErros, leituraStore.erros)

  console.log('Response ', response)

  if (!response.success) {
    return
  }
}
</script>

<template>
  <div class="columns is-centered" style="min-height: 100vh; align-items: center">
    <div class="column is-6">
      <div class="box">
        <h1 class="title has-text-centered">Cadastrar Leitura</h1>

        <div v-if="Object.keys(novosErros).length" class="notification is-danger is-light">
          <ErroMensagemValidacaoForm :erros="novosErros" />
        </div>

        <!-- <div v-if="generoStore.estaCerregandoGenero">
          <Carregando />
        </div> -->

        <form @submit.prevent="cadastrarLeitura">
          <!-- Linha 1 -->
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label" for="titulo">Título</label>
                <div class="control">
                  <input id="titulo" type="text" v-model="leitura.titulo" class="input" />
                </div>
                <p v-if="Object.keys(novosErros).length">
                  <ErroMensagemValidacaoForm :erros="novosErros.titulo" />
                </p>
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="label" for="nome_autor">Autor</label>
                <div class="control">
                  <input id="nome_autor" type="text" v-model="leitura.nome_autor" class="input" />
                </div>
                <p v-if="Object.keys(novosErros).length">
                  <ErroMensagemValidacaoForm :erros="novosErros.nome_autor" />
                </p>
              </div>
            </div>
          </div>

          <!-- Linha 2 -->
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label" for="descricao_editora">Editora</label>
                <div class="control">
                  <input
                    id="descricao_editora"
                    type="text"
                    v-model="leitura.descricao_editora"
                    class="input"
                  />
                </div>
                <p v-if="Object.keys(novosErros).length">
                  <ErroMensagemValidacaoForm :erros="novosErros.descricao_editora" />
                </p>
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="label" for="isbn">ISBN</label>
                <div class="control">
                  <input id="isbn" type="text" v-model="leitura.isbn" class="input" />
                </div>
                <p v-if="Object.keys(novosErros).length">
                  <ErroMensagemValidacaoForm :erros="novosErros.isbn" />
                </p>
              </div>
            </div>
          </div>

          <!-- Linha 3 -->
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label" for="qtd_capitulos">Capítulos</label>
                <div class="control">
                  <input
                    id="qtd_capitulos"
                    type="number"
                    v-model="leitura.qtd_capitulos"
                    class="input"
                  />
                </div>
                <p v-if="Object.keys(novosErros).length">
                  <ErroMensagemValidacaoForm :erros="novosErros.qtd_capitulos" />
                </p>
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="label" for="qtd_paginas">Páginas</label>
                <div class="control">
                  <input
                    id="qtd_paginas"
                    type="number"
                    v-model="leitura.qtd_paginas"
                    class="input"
                  />
                </div>
                <p v-if="Object.keys(novosErros).length">
                  <ErroMensagemValidacaoForm :erros="novosErros.qtd_paginas" />
                </p>
              </div>
            </div>
          </div>

          <!-- Linha 4 -->
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label" for="data_publicacao">Publicação</label>
                <div class="control">
                  <input
                    id="data_publicacao"
                    type="date"
                    v-model="leitura.data_publicacao"
                    class="input"
                  />
                </div>
                <p v-if="Object.keys(novosErros).length">
                  <ErroMensagemValidacaoForm :erros="novosErros.data_publicacao" />
                </p>
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="label" for="data_registro">Registro</label>
                <div class="control">
                  <input
                    id="data_registro"
                    type="date"
                    v-model="leitura.data_registro"
                    class="input"
                  />
                </div>
                <p v-if="Object.keys(novosErros).length">
                  <ErroMensagemValidacaoForm :erros="novosErros.data_registro" />
                </p>
              </div>
            </div>
          </div>

          <!-- Linha 5 -->
          <div class="field">
            <label class="label" for="capa">URL da Capa</label>
            <div class="control">
              <input id="capa" type="text" v-model="leitura.capa" class="input" />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.capa" />
            </p>
          </div>

          <!-- Linha 6 -->
          <div class="field">
            <label class="label" for="descricao">Descrição</label>
            <div class="control">
              <textarea id="descricao" v-model="leitura.descricao" class="textarea"></textarea>
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.descricao" />
            </p>
          </div>

          <!-- Linha 7 -->
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label" for="id_status_leitura">Status</label>
                <div class="control select is-fullwidth">
                  <select id="id_status_leitura" v-model="leitura.id_status_leitura">
                    <option value="1">Não Iniciado</option>
                    <option value="2">Em Andamento</option>
                    <option value="3">Concluído</option>
                  </select>
                </div>
                <p v-if="Object.keys(novosErros).length">
                  <ErroMensagemValidacaoForm :erros="novosErros.id_status_leitura" />
                </p>
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="label" for="id_genero">Gêneros</label>
                <div class="control select is-fullwidth">
                  <select id="id_genero" v-model="leitura.id_genero">
                    <option
                      v-for="genero in generoStore.generos"
                      :key="genero.id_leitura"
                      :value="genero.id_leitura"
                    >
                      {{ genero.titulo }}
                    </option>
                  </select>
                </div>
                <p v-if="Object.keys(novosErros).length">
                  <ErroMensagemValidacaoForm :erros="novosErros.id_genero" />
                </p>
              </div>
            </div>
          </div>

          <!-- Botão -->
          <div class="field mt-4">
            <div class="control">
              <button
                type="submit"
                class="button is-primary is-fullwidth"
                :disabled="leituraStore.estaCerregando"
              >
                {{ leituraStore.estaCerregando ? 'Enviando...' : 'Cadastrar' }}
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
