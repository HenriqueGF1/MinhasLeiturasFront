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

const progressoLeitura = reactive({
  id_leitura: props.id_leitura,
  qtd_paginas_lidas: null,
  data_leitura: null,
})

const erros = reactive({})

const progressoTotal = ref({
  total_paginas_lidas: 0,
  qtd_paginas: 1,
})

const numeros = computed(() => {
  let inicio = progressoTotal.value.total_paginas_lidas || 0
  const fim = progressoTotal.value.qtd_paginas

  if (inicio === 0) inicio = 1
  if (fim <= inicio) return [inicio]

  return Array.from({ length: fim - inicio + 1 }, (_, i) => i + inicio)
})

const qtdPaginasParaSalvar = computed(() => {
  if (!progressoLeitura.qtd_paginas_lidas) return 0
  return progressoLeitura.qtd_paginas_lidas - (progressoTotal.value.total_paginas_lidas || 0)
})

function resetErros() {
  Object.keys(erros).forEach((k) => delete erros[k])
}

function resetForm() {
  progressoLeitura.qtd_paginas_lidas = null
  progressoLeitura.data_leitura = null
}

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

async function adicionarProgresso() {
  isActive.value = true
  await buscarProgresso()
}
</script>

<template>
  <div>
    <button @click="adicionarProgresso" class="button is-primary is-small">
      Adicionar Progresso
    </button>

    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background" @click="isActive = false"></div>

      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Adicionar Progresso</p>
          <button class="delete" aria-label="close" @click="isActive = false"></button>
        </header>

        <section class="modal-card-body">
          <input id="id_leitura" type="hidden" v-model="progressoLeitura.id_leitura" />
          <ErroMensagemValidacaoForm v-if="erros.id_leitura" :erros="erros.id_leitura" />

          <div class="field">
            <label class="label">Página em que você parou</label>
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
            <ErroMensagemValidacaoForm
              v-if="erros.qtd_paginas_lidas"
              :erros="erros.qtd_paginas_lidas"
            />
          </div>

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

        <footer class="modal-card-foot is-justify-content-flex-end">
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
  width: 100%;
  border-radius: 8px;
}

.modal-card-head,
.modal-card-foot {
  padding: 1rem 1.25rem;
}

.modal-card-body {
  padding: 1.25rem;
}

.select select {
  border-radius: 6px;
}

.input {
  border-radius: 6px;
}
</style>
