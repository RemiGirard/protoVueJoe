<script setup lang="ts">
  import IconFamily from "@/Presentation/icons/Family.vue";
  import IconPeople from "@/Presentation/icons/People.vue";
  import DropdownConfig from "@/Presentation/components/MealsSelection/DropdownConfig.vue";

  const props = defineProps<{
    value: {adults: number, children: number},
    setValue: (people: { adults: number; children: number }) => void,
  }>();

  const config = {
    maxAdults: 4,
    maxChildren: 4,
  };

  const red = '#BD0000FF';

</script>

<template>
  <DropdownConfig>
    <template #button>
      <div style="display: flex; flex-direction: row; justify-content: space-around;">
        <IconFamily style="width: 50px;height: 50px;"/>
      </div>
      <div style="text-align: center;">
        people
      </div>
    </template>
    <template #dropdown>
        <div :style="{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}">
          <IconPeople
              v-for="index in config.maxAdults" :key="index"
              @click="() => setValue({...value,adults: index})"
              :style="{width: '30px',height: '50px',margin: '10px',color:props.value.adults >= index ? red : ''}"
          />
        </div>
        <div :style="{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}">
          <IconPeople
              v-for="index in config.maxChildren" :key="index"
              :style="{width: '20px',height: '30px',margin: '10px',color:props.value.children >= index ? red : ''}"
              @click="() => setValue({...value, children: index})"
          />
        </div>
    </template>
  </DropdownConfig>
</template>

