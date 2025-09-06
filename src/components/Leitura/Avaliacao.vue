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
    <!-- Botão de abrir modal -->
    <button @click="isActive = true" class="button is-primary is-small">Avaliar</button>

    <!-- Modal -->
    <div class="modal" :class="{ 'is-active': isActive }">
      <div class="modal-background" @click="isActive = false"></div>

      <div class="modal-card">
        <!-- Cabeçalho -->
        <header class="modal-card-head">
          <p class="modal-card-title">Avaliação</p>
          <button class="delete" aria-label="close" @click="isActive = false"></button>
        </header>

        <!-- Corpo -->
        <section class="modal-card-body">
          <!-- Nota -->
          <div class="field">
            <label class="label" for="nota">Nota</label>
            <div class="control">
              <input
                id="nota"
                type="number"
                min="0"
                max="10"
                v-model="avaliacao.nota"
                class="input"
              />
            </div>
            <p v-if="novosErros?.nota">
              <ErroMensagemValidacaoForm :erros="novosErros.nota" />
            </p>
          </div>

          <!-- Descrição -->
          <div class="field">
            <label class="label" for="descricao_avaliacao">Descrição</label>
            <div class="control">
              <textarea
                id="descricao_avaliacao"
                v-model="avaliacao.descricao_avaliacao"
                class="textarea"
                placeholder="Escreva sua avaliação..."
              ></textarea>
            </div>
            <p v-if="novosErros?.descricao_avaliacao">
              <ErroMensagemValidacaoForm :erros="novosErros.descricao_avaliacao" />
            </p>
          </div>

          <!-- Data início -->
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <label class="label" for="data_inicio">Início</label>
                <div class="control">
                  <input
                    id="data_inicio"
                    type="date"
                    v-model="avaliacao.data_inicio"
                    class="input"
                  />
                </div>
                <p v-if="novosErros?.data_inicio">
                  <ErroMensagemValidacaoForm :erros="novosErros.data_inicio" />
                </p>
              </div>

              <!-- Data término -->
              <div class="field">
                <label class="label" for="data_termino">Término</label>
                <div class="control">
                  <input
                    id="data_termino"
                    type="date"
                    v-model="avaliacao.data_termino"
                    class="input"
                  />
                </div>
                <p v-if="novosErros?.data_termino">
                  <ErroMensagemValidacaoForm :erros="novosErros.data_termino" />
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Rodapé -->
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
  max-width: 600px;
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

.textarea {
  resize: vertical;
  min-height: 80px;
}
</style>
