<script setup>
import { computed } from 'vue'

const props = defineProps({
  leitura: {
    type: Object,
    required: true,
  },
})

const descricaoCurta = computed(() => {
  if (!props.leitura?.descricao) return ''
  return props.leitura.descricao.length > 200
    ? props.leitura.descricao.slice(0, 200) + '...'
    : props.leitura.descricao
})
</script>

<template>
  <div class="card" v-if="props.leitura">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="props.leitura.capa" :alt="props.leitura.titulo" />
      </figure>
    </div>

    <div class="card-content">
      <p class="title is-5">{{ props.leitura.titulo }}</p>
      <div class="content tooltip" :data-tooltip="props.leitura.descricao">
        {{ descricaoCurta }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-image {
  flex-shrink: 0;
}

.card-image img {
  object-fit: contain;
  height: 250px;
  width: 100%;
}

.card {
  max-width: 320px;
  margin: 1rem auto;
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
  background: #fff;
  color: black;
  padding: 0.5rem;
  border-radius: 6px;
  white-space: pre-wrap;
  width: 250px;
  font-size: 0.85rem;
  text-align: center;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: opacity 0.2s ease-in-out;
}

.tooltip:hover::after {
  opacity: 1;
}
</style>
