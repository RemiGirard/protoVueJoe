<script setup lang="ts">
  defineProps<{
    onClick: () => void;
    disabled?: boolean;
  }>();
</script>

<template>
  <button @click="() => onClick()" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
  button {
    text-decoration: none;
    background-color: var(--main-color);
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: bold;
    font-size: 22px;
    padding: 9px 15px 9px 15px;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
  }
  button:disabled {
    background-color: var(--main-color-disabled);
    color: var(--main-text-color-disabled);
  }
</style>