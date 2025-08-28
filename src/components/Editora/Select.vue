<script setup>
import vSelect from 'vue-select'

const props = defineProps({
  modelValue: Object,
  options: Array,
})

const emit = defineEmits(['update:modelValue', 'campoEditora'])
</script>

<template>
  <div class="field">
    <label class="label" for="">Editora</label>
    <div class="control">
      <v-select
        :model-value="props.modelValue"
        :options="props.options"
        label="descricao"
        :reduce="(editora) => editora"
        taggable
        @update:modelValue="emit('update:modelValue', $event)"
        @new=""
        class="is-fullwidth"
      />
    </div>
  </div>
</template>
