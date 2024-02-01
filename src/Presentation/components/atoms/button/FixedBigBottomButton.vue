<script setup lang="ts">
  const props = withDefaults(defineProps<{
    onClick: (e: Event) => void,
    style?: any,
  }>(), {
    style: '',
  });
</script>

<template>
  <div>
    <button @click="onClick" :style="props.style">
      <slot />
    </button>
  </div>
</template>

<style scoped>
  div {
    position: sticky;
    left: 0;
    width: 100%;
    bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
  }
  button {
    width: 80%;
    height: 100px;
    border: none;
    border-radius: 100px;
    pointer-events: all;
    background: var(--main-color);
    color: var(--main-text-color);
    font-size: 2.8em;

  }
  button:hover{
    background: var(--main-color-dark);
  }
</style>