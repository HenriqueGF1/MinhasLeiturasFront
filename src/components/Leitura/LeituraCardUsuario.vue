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
  if (!data) return ''
  const apenasData = data.split(' ')[0]
  return apenasData
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
        <p class="title is-6">{{ leitura.leitura.titulo }}</p>
        <p class="subtitle is-7">
          {{ leitura.leitura.autor.nome || 'Autor desconhecido' }}
        </p>

        <div class="descricao tooltip" :data-tooltip="leitura.leitura.descricao">
          {{ descricaoCurta }}
        </div>

        <small class="has-text-grey is-size-7">
          📅 Publicado: {{ formatarData(leitura.leitura.data_publicacao) }} | 📚
          {{ leitura.leitura.qtd_paginas }} páginas | 📖
          {{ leitura.leitura.qtd_capitulos }} capítulos
        </small>
      </div>
    </div>

    <footer class="card-footer" style="padding: 0.5rem">
      <div class="box mt-3" style="padding: 0.5rem">
        <div
          class="is-flex is-justify-content-center is-align-items-center is-flex-wrap-nowrap"
          style="gap: 0.5rem"
        >
          <button @click="handleDelete" class="button is-danger is-small">Excluir</button>

          <div v-if="leitura.id_status_leitura === 2">
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
  max-width: 300px;
  width: 100%;
  min-height: 380px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: visible;
  margin: 1rem auto;
}

.card-image img {
  object-fit: cover;
  height: 180px;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
}

.card-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
}

.descricao {
  margin: 0.3rem 0;
  font-size: 0.85rem;
  color: #4a4a4a;
  line-height: 1.3;
}

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
  padding: 0.4rem;
  border-radius: 6px;
  white-space: pre-wrap;
  width: 220px; /* menor tooltip */
  font-size: 0.8rem;
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
