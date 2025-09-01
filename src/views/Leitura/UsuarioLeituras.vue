<script setup>
import { onMounted } from 'vue'

import { useLeituraStore } from '@/stores/leituraStore'

import Carregando from '../../components/Carregando.vue'
import Avaliacao from '../../components/Leitura/Avaliacao.vue'
import LeituraCardUsuario from '../../components/Leitura/LeituraCardUsuario.vue'
import Progresso from '../../components/Leitura/Progresso.vue'

const leituraStore = useLeituraStore()

onMounted(() => {
  leituraStore.fetchLeiturasUsuario()
})
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Tela de Leituras do Usuário</h1>

      <!-- Enquanto estiver carregando -->
      <div v-if="leituraStore.estaCarregando">
        <Carregando />
      </div>

      <!-- Quando terminar de carregar -->
      <div v-else>
        <!-- Se não houver leituras -->
        <div
          v-if="!leituraStore.leiturasUsuario || leituraStore.leiturasUsuario.length === 0"
          class="has-text-centered"
        >
          <p class="subtitle">Nenhuma leitura disponível.</p>
        </div>

        <!-- Se houver leituras -->
        <div v-else class="columns is-multiline is-centered">
          <div
            v-for="leitura in leituraStore.leiturasUsuario"
            :key="leitura.id_leitura"
            class="column is-4-tablet is-3-desktop"
          >
            <LeituraCardUsuario
              :leitura="leitura.leitura"
              @delete="() => leituraStore.deleteLeitura(leitura.id_usuario_leitura)"
            />

            <div class="box mt-4">
              <div class="buttons">
                <div v-if="leitura.id_status_leitura === 2" class="mr-2">
                  <Progresso :id_leitura="leitura.id_leitura" />
                </div>

                <div v-if="!leitura.avaliacao">
                  <Avaliacao :id_leitura="leitura.id_leitura" />
                </div>
              </div>
            </div>
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
