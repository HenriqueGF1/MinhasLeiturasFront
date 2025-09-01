<script setup>
import { onMounted } from 'vue'

import { useAvaliacoesStore } from '@/stores/avaliacoesStore'

import AvaliacoesCard from '../../components/Avaliacao/AvaliacoesCard.vue'
import Carregando from '../../components/Carregando.vue'

const avaliacoesStore = useAvaliacoesStore()

onMounted(() => {
  avaliacoesStore.fetchAvaliacoes()
})
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Tela de Avaliações</h1>

      <div v-if="avaliacoesStore.estaCarregandoAvaliacao">
        <Carregando />
      </div>

      <div v-else-if="avaliacoesStore.avaliacoes.length >= 1">
        <div class="columns is-multiline is-centered">
          <div
            v-for="avaliacao in avaliacoesStore.avaliacoes"
            :key="avaliacao.id_avaliacao_leitura"
            class="column is-6"
          >
            <AvaliacoesCard
              :avaliacao="avaliacao"
              :leitura="avaliacao.leitura"
              @deletarAvaliacaoLeitura="
                () => avaliacoesStore.deleteAvaliacaoLeitura(avaliacao.id_avaliacao_leitura)
              "
            />
          </div>
        </div>
      </div>

      <div v-else class="has-text-centered">
        <p class="subtitle">Nenhuma avaliação disponível.</p>
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
