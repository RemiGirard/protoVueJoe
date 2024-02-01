<script setup lang="ts">
import {ref} from "vue";

const display = ref(false);
const dropdownRef = ref(null);
const dropdownButtonRef = ref(null);
const dropdownOverlay = ref(null);

</script>

<template>
  <div style="display: flex; flex-direction: column;width: 80px;height: 52px;">
    <button ref='dropdownButtonRef' @click="display = !display">
      <slot name="button" />
    </button>
    <div v-if="display" ref="dropdownRef" style="position: relative;">
      <div style="position: absolute; background-color: white;width: 200px;height: 150px;padding: 10px;z-index: 101;">
        <slot name="dropdown" />
      </div>
    </div>
    <div v-if="display" class="invisible-overlay" @click.stop.prevent="display = false" ref="dropdownOverlay"/>
  </div>
</template>

<style scoped>
button {
  background-color: white;
  color: black;
  border: none;
  width: 100%;
  height: 100%;
}
.invisible-overlay {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: transparent;
  z-index: 100; /* Ensure the overlay is below the dropdown content */
}
</style>