<script setup>
import { computed } from 'vue'

import Avaliacao from '../../components/Leitura/Avaliacao.vue'
import Progresso from '../../components/Leitura/Progresso.vue'

const props = defineProps({
  leitura: { type: Object, required: true },
})

const emit = defineEmits(['delete'])

function handleDelete() {
  emit('delete')
}

const descricaoCurta = computed(() => {
  if (!props.leitura.leitura.descricao) return ''
  return props.leitura.leitura.descricao.length > 200
    ? props.leitura.leitura.descricao.slice(0, 200) + '...'
    : props.leitura.leitura.descricao
})

const formatarData = (data) => {
  const d = new Date(data)
  return d.toLocaleDateString('pt-BR') // → 01/09/2025
}
</script>

<template>
  <div class="card leitura-card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="leitura.leitura.capa" :alt="leitura.leitura.titulo" />
      </figure>
    </div>

    <div class="card-content">
      <div class="content has-text-centered">
        <p class="title is-5">{{ leitura.leitura.titulo }}</p>
        <p class="subtitle is-6">
          {{ leitura.leitura.autor || 'Autor desconhecido' }}
        </p>

        <div class="descricao tooltip" :data-tooltip="leitura.leitura.descricao">
          {{ descricaoCurta }}
        </div>

        <small class="has-text-grey">
          📅 Publicado: {{ formatarData(leitura.leitura.data_publicacao) }} | 📚
          {{ leitura.leitura.qtd_paginas }} páginas | 📖
          {{ leitura.leitura.qtd_capitulos }} capítulos
        </small>
      </div>
    </div>
    <footer class="card-footer" style="padding: 0.75rem; text-align: center">
      <div class="box mt-4">
        <div class="buttons">
          <button @click="handleDelete" class="button is-danger is-small" style="margin: 0 auto">
            Excluir
          </button>
          <div v-if="leitura.id_status_leitura === 2" class="mr-2">
            <Progresso :id_leitura="leitura.leitura.id_leitura" />
          </div>

          <div v-if="!leitura.avaliacao">
            <Avaliacao :id_leitura="leitura.leitura.id_leitura" />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.leitura-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-image img {
  object-fit: cover;
  height: 250px;
  width: 100%;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Espaçamento interno mais compacto */
  padding: 1rem;
}

.descricao {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #4a4a4a;
  line-height: 1.3;
}

/* Tooltip */
.tooltip {
  position: relative;
  cursor: help;
}

.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  opacity: 0;
  pointer-events: none;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background: #f5f5f5;
  color: #333;
  padding: 0.5rem;
  border-radius: 6px;
  white-space: pre-wrap;
  width: 280px;
  font-size: 0.85rem;
  text-align: center;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease-in-out;
}

.tooltip:hover::after {
  opacity: 1;
}

.card-footer {
  margin-top: auto;
}
</style>
