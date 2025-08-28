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
  <div
    class="card is-flex is-flex-direction-column is-justify-content-space-between"
    style="min-height: 500px; width: 100%"
  >
    <!-- Conteúdo principal -->
    <div class="card-content is-flex is-flex-direction-row">
      <!-- Capa maior -->
      <figure class="image is-160x240 mr-4">
        <img :src="leitura.capa" :alt="leitura.titulo" class="is-rounded" />
      </figure>

      <!-- Informações -->
      <div class="content is-flex is-flex-direction-column is-justify-content-space-between">
        <div>
          <h2 class="title is-5">{{ leitura.titulo }}</h2>
          <p class="subtitle is-6">{{ leitura.descricao }}</p>

          <ul>
            <li><strong>ISBN:</strong> {{ leitura.isbn }}</li>
            <li><strong>Publicação:</strong> {{ formatarData(leitura.data_publicacao) }}</li>
            <li><strong>Capítulos:</strong> {{ leitura.qtd_capitulos }}</li>
            <li><strong>Páginas:</strong> {{ leitura.qtd_paginas }}</li>
          </ul>
        </div>

        <!-- Avaliação -->
        <div v-if="avaliacao" class="mt-3 pt-2" style="border-top: 1px solid #eee">
          <h3 class="has-text-weight-semibold">Avaliação</h3>
          <p><strong>Nota:</strong> {{ avaliacao.nota }} / 10</p>
          <p><strong>Comentário:</strong> {{ avaliacao.descricao_avaliacao }}</p>
          <p class="is-size-7 has-text-grey">
            Início: {{ formatarData(avaliacao.data_inicio) }} | Término:
            {{ formatarData(avaliacao.data_termino) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Rodapé -->
    <footer class="card-footer">
      <a @click="deletarAvaliacaoLeitura" class="card-footer-item has-text-danger"> Excluir </a>
    </footer>
  </div>
</template>

<style scoped>
/* Trunca texto longo (se não usar plugin tailwind line-clamp) */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
