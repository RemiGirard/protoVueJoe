<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/Presentation/components/Header.vue'
</script>

<template>
  <div :style="{display: 'flex', flexDirection: 'column', justifyContent: 'center'}">
    <div>
      <div class="wrapper" >
        <Header title="Joe" text="Select delicious meals and Joe order your groceries" />
      </div>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>

</style>
