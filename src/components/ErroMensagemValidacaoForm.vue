<template>
  <ul v-if="erros.length" class="help is-danger">
    <li v-for="(mensagem, index) in erros" :key="index">{{ mensagem }}</li>
  </ul>
</template>

<script setup>
defineProps({
  erros: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
ul {
  margin: 0;
  padding-left: 1em;
}
li {
  list-style-type: none;
  padding: 8px;
}
</style>
