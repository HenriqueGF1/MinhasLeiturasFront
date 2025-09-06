<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useAutoresStore } from '@/stores/autoresStore'
import { useEditorasStore } from '@/stores/editorasStore'
import { useGeneroLeituraStore } from '@/stores/generoLeituraStore'
import { useLeituraStore } from '@/stores/leituraStore'
import { useStatusLeituraStore } from '@/stores/statusLeituraStore'

import AutorSelect from '../../components/Autor/Select.vue'
import Carregando from '../../components/Carregando.vue'
import EditoraSelect from '../../components/Editora/Select.vue'
import ErroMensagemValidacaoForm from '../../components/ErroMensagemValidacaoForm.vue'
import GenerosSelect from '../../components/Generos/Select.vue'
import StatusLeiturasSelect from '../../components/StatusLeituras/Select.vue'

const router = useRouter()

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
  capa_arquivo: '',
  id_editora: null,
  descricao_editora: '',
  id_autor: null,
  nome_autor: '',
  data_publicacao: '',
  qtd_capitulos: '',
  qtd_paginas: '',
  isbn: '978057507900',
  data_registro: new Date().toISOString(),
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

const pesquisarIsbn = async () => {
  if (!leitura.isbn || leitura.isbn.length < 13) return

  try {
    const response = await leituraStore.pesquisarIsbn(leitura.isbn)

    if (!response) return

    const { titulo, descricao, qtd_paginas, qtd_capitulos, data_publicacao, capa, nome_autor } =
      response

    Object.assign(leitura, {
      titulo: titulo || '',
      descricao: descricao || '',
      qtd_paginas: qtd_paginas || 0,
      qtd_capitulos: qtd_capitulos || 0,
      data_publicacao: data_publicacao || '',
      capa: capa || '',
      nome_autor: nome_autor || '',
    })

    controleCamposCapa()
  } catch (error) {
    console.error('❌ Erro ao pesquisar ISBN:', error)
  }
}

const cadastrarLeitura = async () => {
  Object.assign(novosErros, {})
  const response = await leituraStore.cadastrar(leitura)
  Object.assign(novosErros, leituraStore.erros)
  if (!response.success) return

  router.push({ name: 'usuario-leituras' })
}

const controleCamposCapa = () => {
  const fileInput = document.querySelector('#file-js-example input[type=file]')
  const fileName = document.querySelector('#file-js-example .file-name')
  const imagemPreview = document.querySelector('#imagemPreview')
  const capaArquivo = document.querySelector('#capaArquivo')
  const capaUrl = document.querySelector('#capaUrl')
  const imagemPreviewDiv = document.querySelector('#imagemPreviewDiv')

  capaArquivo.disabled = false
  capaUrl.disabled = false

  imagemPreviewDiv.style.display = 'block'

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0]
    fileName.textContent = file.name
    imagemPreview.src = URL.createObjectURL(file)

    leitura.capa = ''
    leitura.capa_arquivo = file
    capaUrl.disabled = true
  } else {
    imagemPreview.src = leitura.capa
    capaArquivo.disabled = true
    leitura.capa_arquivo = ''
    fileName.textContent = ''
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8">
          <div class="box">
            <h1 class="title has-text-centered mb-5">Cadastrar Leitura</h1>

            <!-- Carregando ISBN -->
            <div v-if="leituraStore.estaCarregandoIsbn" class="has-text-centered mb-4">
              <Carregando />
            </div>

            <!-- Erros do formulário -->
            <div v-if="Object.keys(novosErros).length" class="notification is-danger is-light">
              <ErroMensagemValidacaoForm :erros="novosErros" />
            </div>

            <form @submit.prevent="cadastrarLeitura">
              <!-- Linha 1: Título + Autor -->
              <div class="columns is-multiline">
                <div class="column is-6">
                  <div class="field">
                    <label class="label" for="titulo">Título</label>
                    <div class="control">
                      <input id="titulo" type="text" v-model="leitura.titulo" class="input" />
                    </div>
                    <ErroMensagemValidacaoForm
                      v-if="novosErros.titulo"
                      :erros="novosErros.titulo"
                    />
                  </div>
                </div>

                <div class="column is-6">
                  <div v-if="autoresStore.estaCarregandoAutores" class="has-text-centered">
                    <Carregando />
                  </div>
                  <div v-else>
                    <AutorSelect
                      v-model="autorSelecionado"
                      :options="autoresStore.autores"
                      :taggable="true"
                    />
                  </div>
                </div>
              </div>

              <!-- Linha 2: Editora + ISBN -->
              <div class="columns is-multiline">
                <div class="column is-6">
                  <div v-if="editorasStore.estaCarregandoEditoras" class="has-text-centered">
                    <Carregando />
                  </div>
                  <div v-else>
                    <EditoraSelect v-model="editoraSelecionado" :options="editorasStore.editoras" />
                  </div>
                </div>

                <div class="column is-6">
                  <div class="field">
                    <label class="label" for="isbn">ISBN</label>
                    <div class="control">
                      <input
                        id="isbn"
                        type="text"
                        v-model="leitura.isbn"
                        class="input"
                        @blur="pesquisarIsbn"
                      />
                    </div>
                    <ErroMensagemValidacaoForm v-if="novosErros.isbn" :erros="novosErros.isbn" />
                  </div>
                </div>
              </div>

              <!-- Linha 3: Capítulos + Páginas -->
              <div class="columns is-multiline">
                <div class="column is-6">
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

                <div class="column is-6">
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

              <!-- Linha 4: Data Publicação -->
              <div class="columns">
                <div class="column is-6">
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
              </div>

              <!-- Linha 5: Capa URL e arquivo -->
              <div class="field">
                <label class="label" for="capaUrl">Capa (URL)</label>
                <div class="control">
                  <input
                    id="capaUrl"
                    type="text"
                    v-model="leitura.capa"
                    class="input"
                    @change="controleCamposCapa"
                  />
                </div>
              </div>

              <div id="file-js-example" class="file has-name mb-3">
                <label class="file-label">
                  <input
                    id="capaArquivo"
                    class="file-input"
                    type="file"
                    name="resume"
                    @change="controleCamposCapa"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">Capa (Arquivo)</span>
                  </span>
                  <span class="file-name">Sem Arquivo</span>
                </label>
              </div>

              <div class="field" id="imagemPreviewDiv" v-show="imagemPreviewUrl">
                <img
                  id="imagemPreview"
                  :src="imagemPreviewUrl"
                  alt="Pré-visualização da imagem"
                  class="image is-128x128"
                />
              </div>

              <!-- Linha 6: Descrição -->
              <div class="field">
                <label class="label" for="descricao">Descrição</label>
                <div class="control">
                  <textarea id="descricao" v-model="leitura.descricao" class="textarea"></textarea>
                </div>
              </div>

              <!-- Linha 7: Status Leitura + Gêneros -->
              <div class="columns is-multiline">
                <div class="column is-6">
                  <div
                    v-if="statusLeituraStore.estaCarregandoStatusLeitura"
                    class="has-text-centered"
                  >
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

                <div class="column is-6">
                  <div v-if="generoStore.estaCarregandoGenero" class="has-text-centered">
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
              <div class="field mt-5">
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
    </div>
  </section>
</template>

<style></style>
