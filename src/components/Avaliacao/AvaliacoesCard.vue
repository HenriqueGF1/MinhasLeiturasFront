<script setup>
import { defineProps } from 'vue'

defineProps({
  leitura: {
    type: Object,
    required: true,
  },
  avaliacao: {
    type: Object,
    default: null, // permite que não haja avaliação
  },
})

// Função simples para formatar datas no formato DD/MM/YYYY
const formatarData = (data) => {
  if (!data) return ''
  const d = new Date(data)
  if (isNaN(d)) return data
  return d.toLocaleDateString('pt-BR')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Cada avaliação em seu próprio card -->
    <div class="flex flex-col md:flex-row gap-4 p-4 border rounded-lg shadow-md bg-white">
      <!-- Capa à esquerda -->
      <div class="flex-shrink-0 w-36 h-52 md:w-40 md:h-56">
        <img
          :src="leitura.capa"
          :alt="leitura.titulo"
          class="w-full h-full object-cover rounded-lg shadow"
        />
      </div>

      <!-- Informações do livro à direita -->
      <div class="flex-1">
        <h2 class="text-xl font-bold text-gray-800">{{ leitura.titulo }}</h2>
        <p class="text-sm text-gray-600 mb-2">{{ leitura.descricao }}</p>

        <ul class="text-sm text-gray-700 space-y-1">
          <li><strong>ISBN:</strong> {{ leitura.isbn }}</li>
          <li><strong>Publicação:</strong> {{ formatarData(leitura.data_publicacao) }}</li>
          <li><strong>Capítulos:</strong> {{ leitura.qtd_capitulos }}</li>
          <li><strong>Páginas:</strong> {{ leitura.qtd_paginas }}</li>
        </ul>

        <!-- Avaliação -->
        <div v-if="avaliacao" class="mt-4 border-t pt-3">
          <h3 class="font-semibold text-gray-800">Avaliação</h3>
          <p><strong>Nota:</strong> {{ avaliacao.nota }} / 10</p>
          <p><strong>Comentário:</strong> {{ avaliacao.descricao_avaliacao }}</p>
          <p class="text-xs text-gray-500">
            Início: {{ formatarData(avaliacao.data_inicio) }} | Término:
            {{ formatarData(avaliacao.data_termino) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Adicione efeitos opcionais, como hover, bordas ou sombra */
</style>
