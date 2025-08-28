<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import ErroMensagemValidacaoForm from '../../components/ErroMensagemValidacaoForm.vue'
import AutorSelect from '../../components/Autor/Select.vue'
import EditoraSelect from '../../components/Editora/Select.vue'
import GenerosSelect from '../../components/Generos/Select.vue'
import StatusLeiturasSelect from '../../components/StatusLeituras/Select.vue'
import Carregando from '../../components/Carregando.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

import { useLeituraStore } from '@/stores/leituraStore'
import { useGeneroLeituraStore } from '@/stores/generoLeituraStore'
import { useAutoresStore } from '@/stores/autoresStore'
import { useEditorasStore } from '@/stores/editorasStore'
import { useStatusLeituraStore } from '@/stores/statusLeituraStore'

const leituraStore = useLeituraStore()
const generoStore = useGeneroLeituraStore()
const autoresStore = useAutoresStore()
const editorasStore = useEditorasStore()
const statusLeituraStore = useStatusLeituraStore()

// Estado principal da leitura
const leitura = reactive({
  titulo: '',
  descricao: '',
  capa: '',
  id_editora: null,
  descricao_editora: '',
  id_autor: null,
  nome_autor: '',
  data_publicacao: '',
  qtd_capitulos: '',
  qtd_paginas: '',
  isbn: '',
  data_registro: new Date().toISOString(),
  id_usuario: 1,
  id_status_leitura: null,
  id_genero: [],
})

// Erros de validação
const novosErros = reactive({})

// Estados temporários dos selects
const autorSelecionado = ref(null)
const editoraSelecionado = ref(null)
const generosSelecionados = ref([])
const statusLeituraSelecionado = ref(null)

onMounted(() => {
  generoStore.fetchGeneros()
  autoresStore.fetchAutores()
  editorasStore.fetchEditoras()
  statusLeituraStore.fetchStatusLeitura()
})

// Funções para sincronizar selects com leitura
function sincronizarSelecao(selecionado, idKey, nomeKey) {
  if (selecionado) {
    leitura[idKey] = selecionado[idKey] ?? null
    leitura[nomeKey] = selecionado[nomeKey] ?? ''
  } else {
    leitura[idKey] = null
    leitura[nomeKey] = ''
  }
}

watch(autorSelecionado, (novo) => sincronizarSelecao(novo, 'id_autor', 'nome_autor'))

watch(editoraSelecionado, (novo) => {
  if (!novo) {
    leitura.id_editora = null
    leitura.descricao_editora = ''
    return
  }

  if (novo.id_editora) {
    leitura.id_editora = novo.id_editora
    leitura.descricao_editora = ''
  } else {
    leitura.id_editora = null
    leitura.descricao_editora = novo.descricao ?? ''
  }
})

watch(autorSelecionado, (novo) => {
  if (!novo) {
    leitura.id_autor = null
    leitura.nome_autor = ''
    return
  }

  if (novo.id_autor) {
    leitura.id_autor = novo.id_autor
    leitura.nome_autor = ''
  } else {
    leitura.id_autor = null
    leitura.nome_autor = novo.nome ?? ''
  }
})

watch(statusLeituraSelecionado, (novo) => {
  leitura.id_status_leitura = novo?.id_status_leitura ?? null
})

watch(generosSelecionados, (novos) => {
  const lista = Array.isArray(novos) ? novos : []
  leitura.id_genero = lista.map((g) => g.id_genero).filter(Boolean)
})

const cadastrarLeitura = async () => {
  Object.assign(novosErros, {})
  console.log('Dados que serão enviados:', leitura)
  const response = await leituraStore.cadastrar(leitura)
  console.log('Meu resultado ', response)
  Object.assign(novosErros, leituraStore.erros)
  if (!response.success) return

  router.push({ name: 'usuario-leituras' })
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

        <form @submit.prevent="cadastrarLeitura">
          <!-- Linha 1: Título + Autor -->
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label" for="titulo">Título</label>
                <div class="control">
                  <input id="titulo" type="text" v-model="leitura.titulo" class="input" />
                </div>
                <ErroMensagemValidacaoForm v-if="novosErros.titulo" :erros="novosErros.titulo" />
              </div>
            </div>

            <div class="column">
              <div v-if="autoresStore.estaCarregandoAutores">
                <Carregando />
              </div>
              <div v-else>
                <AutorSelect
                  v-model="autorSelecionado"
                  :options="autoresStore.autores"
                  :taggable="true"
                  @new=""
                />
              </div>
            </div>
          </div>

          <!-- Linha 2: Editora + ISBN -->
          <div class="columns">
            <div class="column">
              <div v-if="editorasStore.estaCarregandoEditoras">
                <Carregando />
              </div>
              <div v-else>
                <EditoraSelect v-model="editoraSelecionado" :options="editorasStore.editoras" />
              </div>
            </div>

            <div class="column">
              <div class="field">
                <label class="label" for="isbn">ISBN</label>
                <div class="control">
                  <input id="isbn" type="text" v-model="leitura.isbn" class="input" />
                </div>
                <ErroMensagemValidacaoForm v-if="novosErros.isbn" :erros="novosErros.isbn" />
              </div>
            </div>
          </div>

          <!-- Linha 3: Capítulos + Páginas -->
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
              </div>
            </div>
          </div>

          <!-- Linha 4: Datas -->
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label" for="data_publicacao">Data Publicação</label>
                <div class="control">
                  <input
                    id="data_publicacao"
                    type="date"
                    v-model="leitura.data_publicacao"
                    class="input"
                  />
                </div>
              </div>
            </div>

            <!-- <div class="column">
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
              </div>
            </div> -->
          </div>

          <!-- Linha 5: Capa -->
          <div class="field">
            <label class="label" for="capa">URL da Capa</label>
            <div class="control">
              <input id="capa" type="text" v-model="leitura.capa" class="input" />
            </div>
          </div>

          <!-- Linha 6: Descrição -->
          <div class="field">
            <label class="label" for="descricao">Descrição</label>
            <div class="control">
              <textarea id="descricao" v-model="leitura.descricao" class="textarea"></textarea>
            </div>
          </div>

          <!-- Linha 7: Status Leitura + Gêneros -->
          <div class="columns">
            <div class="column">
              <div v-if="statusLeituraStore.estaCarregandoStatusLeitura">
                <Carregando />
              </div>
              <div v-else>
                <StatusLeiturasSelect
                  v-model="statusLeituraSelecionado"
                  :options="statusLeituraStore.statusLeitura"
                  :creatable="false"
                />
              </div>
            </div>

            <div class="column">
              <div v-if="generoStore.estaCarregandoGenero">
                <Carregando />
              </div>
              <div v-else>
                <GenerosSelect
                  v-model="generosSelecionados"
                  :options="generoStore.generos"
                  :creatable="false"
                  multiple
                />
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
