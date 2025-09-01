<script setup>
import { ref, watch } from 'vue'
import vSelect from 'vue-select'

const props = defineProps({
  modelValue: Array,
  options: Array,
})

const emit = defineEmits(['update:modelValue', 'campoGenero'])

const localValue = ref(props.modelValue || [])

watch(
  () => props.modelValue,
  (novo) => {
    localValue.value = novo || []
  },
)

watch(localValue, (novo) => {
  emit('update:modelValue', novo)
})
</script>

<template>
  <div class="field">
    <label class="label" for="">Gêneros</label>
    <div class="control">
      <v-select
        v-model="localValue"
        :options="props.options"
        label="nome"
        :reduce="(generos) => generos"
        multiple
        taggable
        @new=""
        class="is-fullwidth"
      />
    </div>
  </div>
</template>
