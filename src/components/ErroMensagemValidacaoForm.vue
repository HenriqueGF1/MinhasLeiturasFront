<script setup>
const props = defineProps({
  erros: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <ul v-if="Object.values(erros).some((e) => e.length)" class="help is-danger">
    <li v-for="(mensagens, key) in erros" :key="key">
      <span v-for="(mensagem, index) in mensagens" :key="index">{{ mensagem }}</span>
    </li>
  </ul>
</template>

<style scoped>
ul {
  margin: 0;
  padding-left: 1em;
}
li {
  list-style-type: none;
  padding: 8px 0;
}
</style>
