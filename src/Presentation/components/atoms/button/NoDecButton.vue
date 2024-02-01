<script setup lang="ts">
  // eslint-disable-next-line vue/prefer-import-from-vue
  import type { StyleValue } from '@vue/runtime-dom';

  withDefaults(defineProps<{
      onClick: (e: Event) => void,
      style?: StyleValue,
    }>(),
    {
      style: undefined,
    })
</script>

<template>
  <button @click="onClick" :style="style">
    <slot />
  </button>
</template>

<style scoped>
  button {
    background: transparent;
    font-weight: bold;
    border: none;
    border-radius: 50px;
    padding: 5px 15px 5px 15px;
  }
  button:hover {
    background: #ffffff;
  }
</style>
