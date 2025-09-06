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
  const d = new Date(data)
  if (isNaN(d)) return data
  return d.toLocaleDateString('pt-BR')
}
</script>

<template>
  <div class="card leitura-card">
    <!-- Conteúdo principal -->
    <div class="card-content is-flex is-flex-direction-row is-flex-wrap-wrap">
      <!-- Capa -->
      <figure class="image capa mr-5">
        <img :src="leitura.capa" :alt="leitura.titulo" />
      </figure>

      <!-- Informações -->
      <div class="content is-flex is-flex-direction-column is-justify-content-space-between flex-1">
        <div>
          <h2 class="title is-4 mb-2">{{ leitura.titulo }}</h2>
          <p class="subtitle is-6 line-clamp-3">{{ leitura.descricao }}</p>

          <ul class="is-size-6 mt-3">
            <li><strong>ISBN:</strong> {{ leitura.isbn }}</li>
            <li><strong>Publicação:</strong> {{ formatarData(leitura.data_publicacao) }}</li>
            <li><strong>Capítulos:</strong> {{ leitura.qtd_capitulos }}</li>
            <li><strong>Páginas:</strong> {{ leitura.qtd_paginas }}</li>
          </ul>
        </div>

        <!-- Avaliação -->
        <div v-if="avaliacao" class="avaliacao mt-4 pt-3">
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

    <!-- Rodapé -->
    <footer class="card-footer">
      <a
        @click="deletarAvaliacaoLeitura"
        class="card-footer-item has-text-danger has-text-weight-semibold"
      >
        ❌ Excluir
      </a>
    </footer>
  </div>
</template>

<style scoped>
.leitura-card {
  display: flex;
  flex-direction: column;
  min-height: 420px;
  max-width: 1100px; /* largura máxima do card */
  width: 100%;
  margin: 1.5rem auto; /* mais respiro fora do card */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  background: black;
}

.card-content {
  padding: 2rem 2.5rem; /* 🔥 mais espaçamento interno */
  gap: 1.5rem; /* espaço entre capa e infos */
}

.capa {
  width: 220px;
  height: 320px;
  flex-shrink: 0;
}

.capa img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.content {
  padding: 0.5rem 0; /* menos padding interno, fica equilibrado */
}

.avaliacao {
  border-top: 1px solid black;
  padding-top: 1rem; /* separação do bloco acima */
  margin-top: 1rem;
}

.card-footer {
  margin-top: auto;
  padding: 1rem 1.5rem; /* padding no rodapé */
}
</style>
