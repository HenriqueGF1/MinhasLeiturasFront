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
  <div :class="['navbar-menu', { 'is-active': burgerActive }]">
    <div class="navbar-start">
      <router-link class="navbar-item" :to="{ name: 'leituras' }">MeuApp</router-link>

      <!-- Links quando NÃO está logado -->
      <router-link v-if="!isLogado" class="navbar-item" :to="{ name: 'leituras' }">
        Leituras
      </router-link>
      <router-link v-if="!isLogado" class="navbar-item" :to="{ name: 'usuario-cadastrar' }">
        Cadastro
      </router-link>

      <!-- Links quando ESTÁ logado -->
      <router-link v-if="isLogado" class="navbar-item" :to="{ name: 'leituras' }">
        Leituras
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
      <button v-if="isLogado" class="navbar-item" @click="logout">Sair</button>
      <router-link v-else class="navbar-item" :to="{ name: 'login' }">Login</router-link>
    </div>
  </div>

  <main class="section">
    <router-view />
  </main>

  <Footer />
</template>

<style scoped>
main {
  min-height: calc(100vh - 120px);
}
</style>
