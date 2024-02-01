<script setup lang="ts">
 import { ref } from 'vue'

 const props = withDefaults(defineProps<{
   value: number,
   setValue: (newValue: number) => void,
   step?: number,
   minimum?: number,
   maximum?: number,
 }>(), {
   step: 1,
   minimum: 0,
   maximum: undefined,
 })

 console.debug({step: props.step})
 const currentStep = ref<number>(props.step)

 const decrement = () => {
   props.setValue(Math.max(props.value-currentStep.value, props.minimum))
 }

 const increment = () => {
   props.setValue(Math.min(props.value+currentStep.value, props.maximum ?? Infinity))
 }


</script>

<template>
  <div :style="{display: 'flex', flexDirection: 'row'}">
    <button @click="decrement" :disabled="value<=minimum" :style="{borderRadius: '100px 0 0 100px'}">-</button>
    <div>{{value}}</div>
    <button @click="increment" :disabled="value>=maximum" :style="{borderRadius: '0 100px 100px 0'}">+</button>
  </div>
</template>

<style scoped>
div{
  button {
    background: none;
    border: none;
  }
  button, div {
    font-weight: bold;
    background: var(--color-background-neutral);
    padding: 5px 15px;
  }
  button:hover, div:hover {
    background: grey;
  }
}
</style>