<script setup>
import { reactive, ref } from 'vue'

import { useLeituraStore } from '@/stores/leituraStore'

import Carregando from '../../components/Carregando.vue'
import StatusLeiturasSelect from '../../components/StatusLeituras/Select.vue'
import ErroMensagemValidacaoForm from '../ErroMensagemValidacaoForm.vue'

const isActive = ref(false)

const leituraStore = useLeituraStore()

const props = defineProps({
  id_leitura: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
  statusDeLeitura: {
    type: Array,
    required: true,
  },
})

const leitura = reactive({
  id_leitura: props.id_leitura,
  id_status_leitura: null,
})

const errosForm = ref({})

async function usuarioCadastrarLeituraExistente() {
  errosForm.value = {}

  let dados = {
    ...leitura,
    id_status_leitura: leitura.id_status_leitura.id_status_leitura,
  }

  try {
    const response = await leituraStore.usuarioCadastrarLeituraExistente(dados)
    errosForm.value = leituraStore.erros

    if (!response?.success) return

    await leituraStore.fetchLeituras()
    isActive.value = false
  } catch (error) {
    console.error(error)
    isActive.value = true
  }
}
</script>

<template>
  <div>
    <button class="button is-primary is-small is-fullwidth" @click="isActive = true">
      Adicionar Leitura
    </button>

    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background" @click="isActive = false"></div>

      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Formulário</p>
          <button class="delete" aria-label="close" @click="isActive = false"></button>
        </header>

        <section class="modal-card-body form-body">
          <input id="id_leitura" type="hidden" v-model="leitura.id_leitura" />

          <div v-if="errosForm.id_leitura">
            <ErroMensagemValidacaoForm :erros="errosForm.id_leitura" />
          </div>

          <div class="select-wrapper">
            <div v-if="statusDeLeitura.length < 1">
              <Carregando />
            </div>
            <div v-else>
              <StatusLeiturasSelect
                v-model="leitura.id_status_leitura"
                :options="statusDeLeitura"
                :creatable="false"
              />
            </div>
          </div>
        </section>

        <footer class="modal-card-foot">
          <button class="button is-success" @click="usuarioCadastrarLeituraExistente">
            Salvar
          </button>
          <button class="button" @click="isActive = false">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-card {
  max-width: 600px; /* aumenta a largura */
  min-height: 400px; /* aumenta a altura mínima do formulário */
}

.modal-card-body {
  min-height: 250px; /* deixa o corpo maior para caber o select confortavelmente */
  padding: 2rem; /* mais espaçamento interno */
}

.select-wrapper {
  width: 100%;
}
</style>
