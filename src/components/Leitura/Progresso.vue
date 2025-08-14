<script setup>
import { ref, reactive } from 'vue'
import ErroMensagemValidacaoForm from '../ErroMensagemValidacaoForm.vue'
import { useLeituraStore } from '@/stores/leituraStore'

const leituraStore = useLeituraStore()

const isActive = ref(false)

const props = defineProps({
  id_leitura: {
    type: Number,
    required: true,
    validator: (value) => Number.isInteger(value),
  },
})

const usuario = reactive({
  id_usuario: null,
  id_leitura: props.id_leitura,
  qtd_paginas_lidas: 10,
  data_leitura: '2025-08-14 13:00:00',
})

const novosErros = reactive({})

async function salvar() {
  Object.assign(novosErros, {})

  const response = await leituraStore.progresso(usuario)

  Object.assign(novosErros, leituraStore.erros)

  console.log('Response ', response)

  if (!response.success) {
    return
  }

  isActive.value = false
}
</script>

<template>
  <div>
    <button class="button is-primary is-fullwidth" @click="isActive = true">
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
          <div class="field">
            <label class="label" for="id_usuario">Usuário</label>
            <div class="control">
              <input id="id_usuario" type="text" v-model="usuario.id_usuario" class="input" />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.id_usuario" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="id_leitura">Leitura</label>
            <div class="control">
              <input id="id_leitura" type="text" v-model="usuario.id_leitura" class="input" />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.id_leitura" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="qtd_paginas_lidas">Quantidade de Páginas</label>
            <div class="control">
              <input
                id="qtd_paginas_lidas"
                type="text"
                v-model="usuario.qtd_paginas_lidas"
                class="input"
              />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.qtd_paginas_lidas" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="data_leitura">Data de Leitura</label>
            <div class="control">
              <input id="data_leitura" type="date" v-model="usuario.data_leitura" class="input" />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.data_leitura" />
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
