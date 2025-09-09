<script setup>
import { computed } from 'vue'

import { useStatusLeituraStore } from '@/stores/statusLeituraStore'
import { useUsuarioStore } from '@/stores/usuarioStore'

import UsuarioCadastroLeitura from '../../components/Leitura/UsuarioCadastroLeitura.vue'

const usuarioStore = useUsuarioStore()
const statusLeituraStore = useStatusLeituraStore()

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
  if (!data) return ''
  const apenasData = data.split(' ')[0]
  return apenasData
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
      <p class="title is-6 has-text-centered">{{ leitura.titulo }}</p>
      <p class="subtitle is-7 has-text-centered">
        {{ leitura.autor.nome || 'Autor desconhecido' }}
      </p>

      <div class="content tooltip mt-2" :data-tooltip="leitura.descricao">
        {{ descricaoCurta }}
        <br />
        <small class="has-text-grey is-size-7">
          📅 Publicado: {{ formatarData(leitura.data_publicacao) }} | 📚
          {{ leitura.qtd_paginas }} páginas | 📖 {{ leitura.qtd_capitulos }} capítulos
        </small>
      </div>
    </div>

    <footer class="card-footer has-text-centered p-2">
      <div v-if="usuarioStore.logado && !leitura.usuario_tem_leitura">
        <UsuarioCadastroLeitura
          :id_leitura="leitura.id_leitura"
          :statusDeLeitura="statusLeituraStore.statusLeitura"
        />
      </div>
    </footer>
  </div>
</template>

<style scoped>
.leitura-card {
  display: flex;
  flex-direction: column;
  max-width: 280px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin: 0.8rem auto;
}

.card-image {
  flex-shrink: 0;
}

.card-image img {
  object-fit: cover;
  height: 180px;
  width: 100%;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.8rem 1rem;
}

.card-footer {
  margin-top: auto;
  padding: 0.5rem;
}

.title,
.subtitle {
  text-align: center;
  margin-bottom: 0.3rem;
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
  color: #000;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  white-space: pre-wrap;
  width: 220px;
  font-size: 0.8rem;
  text-align: center;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease-in-out;
}

.tooltip:hover::after {
  opacity: 1;
}
</style>
