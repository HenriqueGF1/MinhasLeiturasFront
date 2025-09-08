<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useUsuarioStore } from '@/stores/usuarioStore'

import Footer from '../src/components/Footer.vue'

const router = useRouter()

const usuarioStore = useUsuarioStore()

const burgerActive = ref(false)
const toggleBurger = () => {
  burgerActive.value = !burgerActive.value
}

const isLogado = computed(() => usuarioStore.logado)

const logout = async () => {
  const response = await usuarioStore.logout()
  if (response.code != 200) {
    return
  }

  router.push({ name: 'leituras' })
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item has-text-weight-bold" :to="{ name: 'leituras' }">
        MinhaBiblioteca
      </router-link>

      <button
        class="navbar-burger"
        :class="{ 'is-active': burgerActive }"
        aria-label="menu"
        :aria-expanded="burgerActive.toString()"
        @click="burgerActive = !burgerActive"
        @keydown.enter.prevent="burgerActive = !burgerActive"
        @keydown.space.prevent="burgerActive = !burgerActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

    <div :class="['navbar-menu', { 'is-active': burgerActive }]">
      <div class="navbar-start">
        <router-link class="navbar-item" :to="{ name: 'leituras' }">Leituras</router-link>
        <router-link v-if="!isLogado" class="navbar-item" :to="{ name: 'usuario-cadastrar' }">
          Cadastro
        </router-link>
        <router-link v-if="isLogado" class="navbar-item" :to="{ name: 'leituras-cadastrar' }">
          Cadastrar Leitura
        </router-link>
        <router-link v-if="isLogado" class="navbar-item" :to="{ name: 'usuario-leituras' }">
          Minhas Leituras
        </router-link>
        <router-link v-if="isLogado" class="navbar-item" :to="{ name: 'avaliacao-pesquisa' }">
          Avaliações
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button v-if="isLogado" @click="logout" class="">Sair</button>
            <router-link v-else class="" :to="{ name: 'login' }"> Login </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <main class="section">
    <router-view />
  </main>

  <Footer />
</template>

<style scoped>
main {
  min-height: calc(100vh - 120px);
}

.navbar {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 1.5rem;
}
</style>
