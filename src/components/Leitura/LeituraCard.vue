<!-- components/LeituraCard.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  leitura: {
    type: Object,
    required: true,
  },
})

const descricaoCurta = computed(() => {
  if (!props.leitura.descricao) return ''
  return props.leitura.descricao.length > 200
    ? props.leitura.descricao.slice(0, 200) + '...'
    : props.leitura.descricao
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
        <img :src="leitura.capa" :alt="leitura.titulo" />
      </figure>
    </div>

    <div class="card-content">
      <p class="title is-5 has-text-centered">{{ leitura.titulo }}</p>
      <p class="subtitle is-6 has-text-centered">
        {{ leitura.autor || 'Autor desconhecido' }}
      </p>

      <!-- Tooltip custom -->
      <div class="content tooltip" :data-tooltip="leitura.descricao">
        {{ descricaoCurta }}
        <br />
        <small class="has-text-grey">
          📅 Publicado: {{ formatarData(leitura.data_publicacao) }} | 📚
          {{ leitura.qtd_paginas }} páginas | 📖 {{ leitura.qtd_capitulos }} capítulos
        </small>
      </div>
    </div>

    <footer class="card-footer">
      <!-- <a href="#" class="card-footer-item">Detalhes</a> -->
      <!-- <a href="#" class="card-footer-item">Comprar</a> -->
    </footer>
  </div>
</template>

<style scoped>
.leitura-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-image {
  flex-shrink: 0;
}

.card-image img {
  object-fit: contain;
  height: 250px;
  width: 100%;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-footer {
  margin-top: auto;
}

.title,
.subtitle {
  text-align: center;
}

/* Tooltip estilo Bulma-like */
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
  background: #fff;
  color: black;
  padding: 0.5rem;
  border-radius: 6px;
  white-space: pre-wrap;
  width: 250px;
  font-size: 0.85rem;
  text-align: center;
  z-index: 10;
  transition: opacity 0.2s ease-in-out;
}

.tooltip:hover::after {
  opacity: 1;
}
</style>
