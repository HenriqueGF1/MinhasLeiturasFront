<script setup>
import { reactive, ref } from 'vue'

import { useAvaliacoesStore } from '@/stores/avaliacoesStore'
import { useLeituraStore } from '@/stores/leituraStore'

import ErroMensagemValidacaoForm from '../ErroMensagemValidacaoForm.vue'

const avaliacoesStore = useAvaliacoesStore()

const isActive = ref(false)

const props = defineProps({
  id_leitura: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
})

const avaliacao = reactive({
  id_leitura: props.id_leitura,
  nota: 10,
  descricao_avaliacao: 'Otima',
  data_inicio: '',
  data_termino: '',
})

const novosErros = reactive({})

async function salvar() {
  Object.assign(novosErros, {})

  const response = await avaliacoesStore.avaliar(avaliacao)

  Object.assign(novosErros, avaliacoesStore.erros)

  console.log('Response ', response)

  if (!response.success) {
    return
  }

  const leituraStore = useLeituraStore()
  leituraStore.fetchLeiturasUsuario()

  isActive.value = false
}
</script>

<template>
  <div>
    <button class="button is-primary is-fullwidth" @click="isActive = true">Avaliar</button>

    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background" @click="isActive = false"></div>

      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Formulário</p>
          <button class="delete" aria-label="close" @click="isActive = false"></button>
        </header>

        <section class="modal-card-body">
          <div class="field">
            <div class="control">
              <input id="id_leitura" type="hidden" v-model="avaliacao.id_leitura" class="input" />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.id_leitura" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="nota">Nota</label>
            <div class="control">
              <input id="nota" type="text" v-model="avaliacao.nota" class="input" />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.nota" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="descricao_avaliacao">Descrição Avaliação</label>
            <div class="control">
              <input
                id="descricao_avaliacao"
                type="text"
                v-model="avaliacao.descricao_avaliacao"
                class="input"
              />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.descricao_avaliacao" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="data_inicio">Data Inicio</label>
            <div class="control">
              <input id="data_inicio" type="date" v-model="avaliacao.data_inicio" class="input" />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.data_inicio" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="data_termino">Data Termino</label>
            <div class="control">
              <input id="data_termino" type="date" v-model="avaliacao.data_termino" class="input" />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.data_termino" />
            </p>
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
