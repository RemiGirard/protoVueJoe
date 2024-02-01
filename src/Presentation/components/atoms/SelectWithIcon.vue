<script setup lang="ts">
  const props = defineProps<{
    value: Number,
    setValue: (newValue: number) => void,
  }>()
</script>

<template>
  <div>
    <select :value="value" @change="(e) => setValue(Number(e.target?.value) ?? 0)">
      <slot />
    </select>
  </div>
</template>

<style scoped>
div {
  min-width: 50px;
  position: relative;
}

select {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  font-size: 1.15rem;
  padding: 0.675em 1em 0.675em 2em;
  background-color: #fff;
  border: none;
  border-radius: 10rem;
  color: #000;
  cursor: pointer;
  text-align: right;
}

div::before,
div::after {
  --size: 0.3rem;
  content: "";
  position: absolute;
  left: 1rem;
  pointer-events: none;
}

div::before {
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
  border-bottom: var(--size) solid black;
  top: 40%;
}

div::after {
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
  border-top: var(--size) solid black;
  top: 55%;
}
</style>