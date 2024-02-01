<script setup lang="ts">
  const props = withDefaults(defineProps<{

  }>(), {

  })
</script>

<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
  button {
    background: none;
    font-weight: bold;
    border: solid var(--color-border);
    border-radius: 100px;
    padding: 5px 15px;
  }
</style>