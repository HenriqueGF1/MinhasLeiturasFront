<script setup>
import { computed, onMounted, ref } from 'vue'

import { useLeituraStore } from '@/stores/leituraStore'
import { useStatusLeituraStore } from '@/stores/statusLeituraStore'

import Carregando from '../../components/Carregando.vue'
import LeituraCard from '../../components/Leitura/LeituraCard.vue'

const leituraStore = useLeituraStore()
const statusLeituraStore = useStatusLeituraStore()

// termo da pesquisa
const termoPesquisa = ref('')

// leituras filtradas
const leiturasFiltradas = computed(() => {
  if (!termoPesquisa.value) return leituraStore.leituras
  return leituraStore.leituras.filter((leitura) =>
    leitura.titulo.toLowerCase().includes(termoPesquisa.value.toLowerCase()),
  )
})

onMounted(() => {
  leituraStore.fetchLeituras()
  statusLeituraStore.fetchStatusLeitura()
})
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Tela de Leituras</h1>

      <!-- Barra de pesquisa (Bulma) -->
      <div class="field has-addons has-addons-centered mb-5">
        <div class="control is-expanded">
          <input
            v-model="termoPesquisa"
            class="input is-medium"
            type="text"
            placeholder="Pesquisar leitura..."
          />
        </div>
        <div class="control">
          <button class="button is-info is-medium">
            <span class="icon">🔍</span>
          </button>
        </div>
      </div>

      <div v-if="leituraStore.estaCarregando">
        <Carregando />
      </div>

      <div v-else-if="leiturasFiltradas.length === 0" class="has-text-centered">
        <p class="subtitle">Nenhuma leitura encontrada.</p>
      </div>

      <div v-else>
        <div class="columns is-multiline is-centered">
          <div
            v-for="leitura in leiturasFiltradas"
            :key="leitura.id_leitura"
            class="column is-4-tablet is-3-desktop"
          >
            <LeituraCard :leitura="leitura" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.loader {
  border: 4px solid transparent;
  border-top: 4px solid #00d1b2;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
