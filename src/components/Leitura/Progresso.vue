<script setup>
import { computed, reactive, ref } from 'vue'

import { useLeituraStore } from '@/stores/leituraStore'
import { useProgressoStore } from '@/stores/progressoStore'

import ErroMensagemValidacaoForm from '../ErroMensagemValidacaoForm.vue'

const progressoStore = useProgressoStore()

const isActive = ref(false)

const props = defineProps({
  id_leitura: {
    type: Number,
    required: true,
    validator: Number.isInteger,
  },
})

// Estado do formulário
const progressoLeitura = reactive({
  id_leitura: props.id_leitura,
  qtd_paginas_lidas: null,
  data_leitura: null,
})

// Erros de validação
const erros = reactive({})

// Progresso total vindo do fetch
const progressoTotal = ref({
  total_paginas_lidas: 0,
  qtd_paginas: 1,
})

// Computed → páginas possíveis para seleção
const numeros = computed(() => {
  let inicio = progressoTotal.value.total_paginas_lidas || 0
  const fim = progressoTotal.value.qtd_paginas

  if (inicio === 0) inicio = 1
  if (fim <= inicio) return [inicio]

  return Array.from({ length: fim - inicio + 1 }, (_, i) => i + inicio)
})

// Computed → calcular quantas páginas salvar
const qtdPaginasParaSalvar = computed(() => {
  if (!progressoLeitura.qtd_paginas_lidas) return 0
  return progressoLeitura.qtd_paginas_lidas - (progressoTotal.value.total_paginas_lidas || 0)
})

// Utils
function resetErros() {
  Object.keys(erros).forEach((k) => delete erros[k])
}

function resetForm() {
  progressoLeitura.qtd_paginas_lidas = null
  progressoLeitura.data_leitura = null
}

// Função para salvar o progresso
async function salvar() {
  const dados = {
    ...progressoLeitura,
    qtd_paginas_lidas: qtdPaginasParaSalvar.value,
  }

  resetErros()
  const response = await progressoStore.progressoCadastrar(dados)
  Object.assign(erros, progressoStore.erros)

  if (response.success) {
    const leituraStore = useLeituraStore()
    leituraStore.fetchLeiturasUsuario()

    isActive.value = false
    resetForm()
  }
}

// Função para buscar progresso do usuário
async function buscarProgresso() {
  await progressoStore.fetchProgressoTotal({
    id_leitura: props.id_leitura,
  })

  if (Array.isArray(progressoStore.progressoTotal)) {
    Object.assign(progressoTotal.value, progressoStore.progressoTotal[0] || {})
  } else {
    Object.assign(progressoTotal.value, progressoStore.progressoTotal)
  }
}

// Abrir modal e buscar progresso
async function adicionarProgresso() {
  isActive.value = true
  await buscarProgresso()
}
</script>

<template>
  <div>
    <button class="button is-primary is-fullwidth" @click="adicionarProgresso">
      Adicionar Progresso
    </button>

    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background" @click="isActive = false"></div>

      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Formulário</p>
          <button class="delete" aria-label="close" @click="isActive = false"></button>
        </header>

        <section class="modal-card-body">
          <!-- Leitura -->
          <div class="field">
            <div class="control">
              <input
                id="id_leitura"
                type="hidden"
                v-model="progressoLeitura.id_leitura"
                class="input"
              />
            </div>
            <ErroMensagemValidacaoForm v-if="erros.id_leitura" :erros="erros.id_leitura" />
          </div>

          <!-- Número de páginas lidas -->
          <div class="field">
            <label class="label">Página que você parou a leitura.</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="progressoLeitura.qtd_paginas_lidas">
                  <option disabled value="">-- Selecione --</option>
                  <option v-for="num in numeros" :key="num" :value="num">
                    {{ num }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Data de leitura -->
          <div class="field">
            <label class="label" for="data_leitura">Data de Leitura</label>
            <div class="control">
              <input
                id="data_leitura"
                type="datetime-local"
                v-model="progressoLeitura.data_leitura"
                class="input"
              />
            </div>
            <ErroMensagemValidacaoForm v-if="erros.data_leitura" :erros="erros.data_leitura" />
          </div>
        </section>

        <footer class="modal-card-foot">
          <button class="button is-success" @click="salvar">Salvar</button>
          <button class="button" @click="isActive = false">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style>
.modal-card {
  max-width: 500px;
}
</style>
