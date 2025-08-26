<script setup>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

const props = defineProps({
  modelValue: Object,
  options: Array,
})

const emit = defineEmits(['update:modelValue', 'campoEdiotra'])

function adicionarNovaEditora(nome) {
  emit('campoEdiotra', nome)
}
</script>

<template>
  <div class="field">
    <label class="label" for="">Ediora</label>
    <div class="control">
      <v-select
        :model-value="props.modelValue"
        :options="props.options"
        label="descricao"
        :reduce="(editora) => editora"
        taggable
        @update:modelValue="emit('update:modelValue', $event)"
        @new="adicionarNovaEditora"
        class="is-fullwidth"
      />
    </div>
  </div>
</template>
