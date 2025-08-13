<script setup>
import Footer from '../src/components/Footer.vue'
import { ref } from 'vue'

const burgerActive = ref(false)
const toggleBurger = () => {
  burgerActive.value = !burgerActive.value
}
</script>

<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{ name: 'leituras' }"> MeuApp </router-link>

      <!-- Hamburger para mobile -->
      <button
        class="navbar-burger button is-white"
        aria-label="menu"
        aria-expanded="false"
        @click="toggleBurger"
        :class="{ 'is-active': burgerActive }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

    <div :class="['navbar-menu', { 'is-active': burgerActive }]">
      <div class="navbar-start">
        <router-link class="navbar-item" :to="{ name: 'leituras' }">Leituras</router-link>
        <router-link class="navbar-item" :to="{ name: 'leituras-cadastrar' }"
          >Cadastrar Leitura</router-link
        >
        <router-link class="navbar-item" :to="{ name: 'usuario-leituras' }"
          >Minhas Leituras</router-link
        >
      </div>

      <div class="navbar-end">
        <router-link class="navbar-item" :to="{ name: 'login' }">Login</router-link>
        <router-link class="navbar-item" :to="{ name: 'usuario-cadastrar' }">Cadastro</router-link>
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
</style>
