<script setup>
import { defineProps } from 'vue'

defineProps({
  leitura: {
    type: Object,
    required: true,
  },
  avaliacao: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['deletarAvaliacaoLeitura'])

function deletarAvaliacaoLeitura() {
  emit('deletarAvaliacaoLeitura')
}

const formatarData = (data) => {
  if (!data) return ''
  const apenasData = data.split(' ')[0]
  return apenasData
}
</script>

<template>
  <div class="card leitura-card">
    <div class="card-content is-flex is-flex-direction-row is-flex-wrap-wrap">
      <figure class="image capa mr-4">
        <img :src="leitura.capa" :alt="leitura.titulo" />
      </figure>

      <div class="content is-flex is-flex-direction-column is-justify-content-space-between flex-1">
        <div>
          <h2 class="title is-5 mb-2">{{ leitura.titulo }}</h2>
          <p class="subtitle is-7 line-clamp-3">{{ leitura.descricao }}</p>

          <ul class="is-size-7 mt-2">
            <li><strong>ISBN:</strong> {{ leitura.isbn }}</li>
            <li><strong>Publicação:</strong> {{ formatarData(leitura.data_publicacao) }}</li>
            <li><strong>Capítulos:</strong> {{ leitura.qtd_capitulos }}</li>
            <li><strong>Páginas:</strong> {{ leitura.qtd_paginas }}</li>
          </ul>
        </div>

        <div v-if="avaliacao" class="avaliacao mt-3 pt-2">
          <h3 class="has-text-weight-semibold mb-2">Avaliação</h3>
          <p><strong>Nota:</strong> {{ avaliacao.nota }} / 10</p>
          <p class="line-clamp-3">
            <strong>Comentário:</strong> {{ avaliacao.descricao_avaliacao }}
          </p>
          <p class="is-size-7 has-text-grey mt-2">
            📅 Início: {{ formatarData(avaliacao.data_inicio) }} | 🔖 Término:
            {{ formatarData(avaliacao.data_termino) }}
          </p>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <button @click="deletarAvaliacaoLeitura" class="button is-danger is-small is-fullwidth">
        Excluir
      </button>
    </footer>
  </div>
</template>

<style scoped>
.leitura-card {
  display: flex;
  flex-direction: column;
  min-height: 300px;
  max-width: 400px;
  width: 100%;
  margin: 1rem auto;
  border-radius: 10px;
  overflow: hidden;
}

.card-content {
  padding: 1.2rem 1.5rem;
  gap: 1rem;
}

.capa {
  width: 140px;
  height: 200px;
  flex-shrink: 0;
}

.capa img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.content {
  padding: 0.3rem 0;
}

.avaliacao {
  border-top: 1px solid black;
  padding-top: 0.7rem;
  margin-top: 0.7rem;
}

.card-footer {
  margin-top: auto;
  padding: 0.7rem 1rem;
}
</style>
