<script setup>
import { onMounted } from 'vue'

import { useLeituraStore } from '@/stores/leituraStore'

import Carregando from '../../components/Carregando.vue'
// import Avaliacao from '../../components/Leitura/Avaliacao.vue'
import LeituraCardUsuario from '../../components/Leitura/LeituraCardUsuario.vue'

// import Progresso from '../../components/Leitura/Progresso.vue'

const leituraStore = useLeituraStore()

onMounted(() => {
  leituraStore.fetchLeiturasUsuario()
})
</script>

<template>
  <section class="section">
    <div class="container">
      <!-- Título principal -->
      <h1 class="title has-text-centered mb-6">📚 Leituras do Usuário</h1>

      <!-- Loader -->
      <div v-if="leituraStore.estaCarregando" class="has-text-centered my-6">
        <Carregando />
      </div>

      <!-- Nenhuma leitura -->
      <div
        v-else-if="!leituraStore.leiturasUsuario || leituraStore.leiturasUsuario.length === 0"
        class="has-text-centered"
      >
        <p class="subtitle has-text-grey-light">Nenhuma leitura disponível.</p>
        <p>Adicione sua primeira leitura clicando no botão "Nova Leitura".</p>
      </div>

      <!-- Lista de leituras -->
      <div v-else class="columns is-multiline is-variable is-4">
        <div
          v-for="leitura in leituraStore.leiturasUsuario"
          :key="leitura.id_leitura"
          class="column is-12-mobile is-6-tablet is-4-desktop"
        >
          <LeituraCardUsuario
            :leitura="leitura"
            @delete="() => leituraStore.deleteLeitura(leitura.id_usuario_leitura)"
          />
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
