<script setup lang="ts">
const props = withDefaults(defineProps<{
    value: number,
    setValue: (newValue: number) => void,
    min?: number,
    max: number,
    step?: number,
}>(), {
  min: 1,
  step: 1,
});

  let options: number[] = [];
  for(let i=props.min;i<=props.max;i+=props.step){
    options.push(i);
  }

</script>

<template>
  <select @change="(e: Event) => setValue(Number(e.target?.value ?? 1))" :value="props.value">
    <option v-for="option in options" :key="option" :value="option">{{option}}</option>
  </select>
</template>
