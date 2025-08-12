<script setup></script>

<template>
  <nav class="navbar">
    <router-link class="nav-link" :to="{ name: 'inicio' }">Início</router-link>
    <router-link class="nav-link" :to="{ name: 'sobre' }">Sobre</router-link>
  </nav>

  <main>
    <router-view />
  </main>

  <footer></footer>
</template>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem;
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #3498db;
}

main {
  padding: 1rem;
}

footer {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #666;
}
</style>
