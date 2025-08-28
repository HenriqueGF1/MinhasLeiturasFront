<script setup>
import vSelect from 'vue-select'

const props = defineProps({
  modelValue: Object,
  options: Array,
})

const emit = defineEmits(['update:modelValue', 'campoAutor'])
</script>

<template>
  <div class="field">
    <label class="label" for="">Autor</label>
    <div class="control">
      <v-select
        :model-value="props.modelValue"
        :options="props.options"
        label="nome"
        :reduce="(autor) => autor"
        taggable
        @update:modelValue="emit('update:modelValue', $event)"
        @new=""
        class="is-fullwidth"
      />
    </div>
  </div>
</template>
