<script setup>
import { onMounted } from 'vue'
import { useLeituraStore } from '@/stores/leituraStore'
import LeituraCard from '../../components/Leitura/LeituraCard.vue'
import Carregando from '../../components/Carregando.vue'

const leituraStore = useLeituraStore()

onMounted(() => {
  leituraStore.fetchLeituras()
})
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Tela de Leituras</h1>

      <div v-if="leituraStore.estaCerregando">
        <Carregando />
      </div>

      <div v-else-if="leituraStore.leituras.length === 0" class="has-text-centered">
        <p class="subtitle">Nenhuma leitura disponível.</p>
      </div>

      <div v-else>
        <div class="columns is-multiline is-centered">
          <div
            v-for="leitura in leituraStore.leituras"
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
