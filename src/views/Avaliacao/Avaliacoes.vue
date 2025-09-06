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
      <!-- Título -->
      <h1 class="title has-text-centered mb-6">📖 Tela de Avaliações</h1>

      <!-- Carregando -->
      <div v-if="avaliacoesStore.estaCarregandoAvaliacao" class="has-text-centered">
        <Carregando />
      </div>

      <!-- Avaliações -->
      <div v-else-if="avaliacoesStore.avaliacoes.length >= 1">
        <div class="columns is-multiline is-centered">
          <div
            v-for="avaliacao in avaliacoesStore.avaliacoes"
            :key="avaliacao.id_avaliacao_leitura"
            class="column is-12-mobile is-6-tablet is-4-desktop"
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

      <!-- Estado vazio -->
      <div v-else class="has-text-centered mt-6">
        <p class="subtitle has-text-grey">Nenhuma avaliação disponível no momento.</p>
        <p>✨ Que tal adicionar a primeira avaliação?</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.title {
  font-weight: 600;
}

.column {
  display: flex;
  justify-content: center;
}

.subtitle {
  margin-top: 1rem;
}

/* Loader customizado (se não for usar Bulma loader) */
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
</style>
