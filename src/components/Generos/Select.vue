<script setup>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

const props = defineProps({
  modelValue: Array, // array de gêneros
  options: Array,
})

const emit = defineEmits(['update:modelValue', 'campoGenero'])

function adicionarNovoGenero(nome) {
  emit('campoGenero', nome)
}
</script>

<template>
  <div class="field">
    <label class="label" for="">Gêneros</label>
    <div class="control">
      <v-select
        :model-value="props.modelValue"
        :options="props.options"
        label="nome"
        :reduce="(g) => g"
        multiple
        taggable
        @update:modelValue="emit('update:modelValue', $event)"
        @new="adicionarNovoGenero"
        class="is-fullwidth"
      />
    </div>
  </div>
</template>
