<script setup>
import { ref, watch } from 'vue'
import vSelect from 'vue-select'

const props = defineProps({
  modelValue: Object,
  options: Array,
  creatable: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (novo) => {
    localValue.value = novo
  },
)

watch(localValue, (novo) => {
  emit('update:modelValue', novo)
})
</script>

<template>
  <div class="field">
    <label class="label" for="">Status Leitura</label>
    <div class="control">
      <v-select
        v-model="localValue"
        :options="props.options"
        label="descricao"
        :reduce="(status) => status"
        :taggable="props.creatable"
        class="is-fullwidth"
      />
    </div>
  </div>
</template>
