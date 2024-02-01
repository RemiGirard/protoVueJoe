<script setup lang="ts">
  const props = defineProps<{
    url: string,
  }>()

  const isButtonOrSelect = (element: HTMLElement) => {
    return ['BUTTON', 'SELECT', 'OPTION'].includes(element.tagName);
  };

  const handleClick = (event: Event) => {
    if(!(event.target instanceof HTMLElement) || !isButtonOrSelect(event.target)){
      window.open(props.url, '_blank');
    }
  }
</script>
<template>
    <a @click.stop="handleClick" style="display: flex;flex-direction: row; width: 100%">
      <slot>
        loading2
      </slot>
    </a>
</template>

<style scoped>
  a {
    padding: 5px;
    padding-top: 10px;
    border-radius: 25px;
  }
  a:hover {
    background: #ffe5e5;
  }
</style>