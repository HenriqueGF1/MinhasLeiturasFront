<script setup>
import { computed, onMounted, ref } from 'vue'

import { useLeituraStore } from '@/stores/leituraStore'
import { useStatusLeituraStore } from '@/stores/statusLeituraStore'

import Carregando from '../../components/Carregando.vue'
import LeituraCard from '../../components/Leitura/LeituraCard.vue'

const leituraStore = useLeituraStore()
const statusLeituraStore = useStatusLeituraStore()

const termoPesquisa = ref('')

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
      <h1 class="title has-text-centered mb-6">📚 Tela de Leituras</h1>

      <div class="field has-addons has-addons-centered mb-5">
        <div class="control is-expanded">
          <input
            v-model="termoPesquisa"
            class="input is-medium is-rounded"
            type="text"
            placeholder="Pesquisar leitura..."
          />
        </div>
        <div class="control">
          <button class="button is-info is-medium is-rounded">
            <span class="icon">🔍</span>
          </button>
        </div>
      </div>

      <div v-if="leituraStore.estaCarregando" class="has-text-centered my-6">
        <Carregando />
      </div>

      <div v-else-if="leiturasFiltradas.length === 0" class="has-text-centered mt-6">
        <p class="subtitle has-text-grey">Nenhuma leitura encontrada.</p>
        <p class="is-size-6">✨ Que tal adicionar uma nova leitura?</p>
      </div>

      <div v-else>
        <div class="columns is-multiline is-centered">
          <div
            v-for="leitura in leiturasFiltradas"
            :key="leitura.id_leitura"
            class="column is-6-mobile is-4-tablet is-3-desktop"
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
  margin: 2rem auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.title {
  font-weight: 600;
}

.subtitle {
  margin-top: 0.5rem;
}

.section {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
