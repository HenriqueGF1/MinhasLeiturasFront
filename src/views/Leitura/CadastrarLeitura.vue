<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import ErroMensagemValidacaoForm from '../../components/ErroMensagemValidacaoForm.vue'
import AutorSelect from '../../components/Autor/Select.vue'
import EditoraSelect from '../../components/Editora/Select.vue'
import GenerosSelect from '../../components/Generos/Select.vue'

import { useLeituraStore } from '@/stores/leituraStore'
import { useGeneroLeituraStore } from '@/stores/generoLeituraStore'
import { useAutoresStore } from '@/stores/autoresStore'
import { useEditorasStore } from '@/stores/editorasStore'

const leituraStore = useLeituraStore()
const generoStore = useGeneroLeituraStore()
const autoresStore = useAutoresStore()
const editorasStore = useEditorasStore()

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
  data_registro: '',
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

onMounted(() => {
  generoStore.fetchGeneros()
  autoresStore.fetchAutores()
  editorasStore.fetchEditoras()
})

// Função genérica para sincronizar seleção (autor/editora) com leitura
function sincronizarSelecao(selecionado, idKey, nomeKey) {
  if (selecionado) {
    if (selecionado[idKey]) {
      leitura[idKey] = selecionado[idKey]
      leitura[nomeKey] = ''
    } else {
      leitura[idKey] = null
      leitura[nomeKey] = selecionado.nome ?? selecionado.descricao
    }
  } else {
    leitura[idKey] = null
    leitura[nomeKey] = ''
  }
}

// Criar novo autor/editora/gênero
function adicionarNovoAutor(nome) {
  autorSelecionado.value = { id_autor: null, nome }
}

function adicionarNovaEditora(descricao) {
  editoraSelecionado.value = { id_editora: null, descricao }
}

function adicionarNovoGenero(nome) {
  generosSelecionados.value.push({ id_genero: null, nome })
}

// Watchers para atualizar leitura
watch(autorSelecionado, (novo) => sincronizarSelecao(novo, 'id_autor', 'nome_autor'))
watch(editoraSelecionado, (novo) => sincronizarSelecao(novo, 'id_editora', 'descricao_editora'))

watch(generosSelecionados, (novos) => {
  leitura.id_genero = []
  novos.forEach((g) => {
    if (g.id_genero) {
      leitura.id_genero.push(g.id_genero)
    } else {
      leitura.id_genero.push({ id_genero: null, nome: g.nome })
    }
  })
})

// Cadastro
const cadastrarLeitura = async () => {
  Object.assign(novosErros, {})

  console.log('Dados que serão enviados:', leitura)

  // Simulação de envio
  const response = await leituraStore.cadastrar(leitura)
  Object.assign(novosErros, leituraStore.erros)
  if (!response.success) return
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
              <AutorSelect
                v-model="autorSelecionado"
                :options="autoresStore.autores"
                @campoAutor="adicionarNovoAutor"
              />
            </div>
          </div>

          <!-- Linha 2: Editora + ISBN -->
          <div class="columns">
            <div class="column">
              <EditoraSelect
                v-model="editoraSelecionado"
                :options="editorasStore.editoras"
                @campoEditora="adicionarNovaEditora"
              />
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
                <ErroMensagemValidacaoForm
                  v-if="novosErros.qtd_capitulos"
                  :erros="novosErros.qtd_capitulos"
                />
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
                <ErroMensagemValidacaoForm
                  v-if="novosErros.qtd_paginas"
                  :erros="novosErros.qtd_paginas"
                />
              </div>
            </div>
          </div>

          <!-- Linha 4: Datas -->
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
                <ErroMensagemValidacaoForm
                  v-if="novosErros.data_publicacao"
                  :erros="novosErros.data_publicacao"
                />
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
                <ErroMensagemValidacaoForm
                  v-if="novosErros.data_registro"
                  :erros="novosErros.data_registro"
                />
              </div>
            </div>
          </div>

          <!-- Linha 5: Capa -->
          <div class="field">
            <label class="label" for="capa">URL da Capa</label>
            <div class="control">
              <input id="capa" type="text" v-model="leitura.capa" class="input" />
            </div>
            <ErroMensagemValidacaoForm v-if="novosErros.capa" :erros="novosErros.capa" />
          </div>

          <!-- Linha 6: Descrição -->
          <div class="field">
            <label class="label" for="descricao">Descrição</label>
            <div class="control">
              <textarea id="descricao" v-model="leitura.descricao" class="textarea"></textarea>
            </div>
            <ErroMensagemValidacaoForm v-if="novosErros.descricao" :erros="novosErros.descricao" />
          </div>

          <!-- Linha 7: Status + Gêneros -->
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
                <ErroMensagemValidacaoForm
                  v-if="novosErros.id_status_leitura"
                  :erros="novosErros.id_status_leitura"
                />
              </div>
            </div>

            <div class="column">
              <GenerosSelect
                v-model="generosSelecionados"
                :options="generoStore.generos"
                @campoGenero="adicionarNovoGenero"
              />
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
