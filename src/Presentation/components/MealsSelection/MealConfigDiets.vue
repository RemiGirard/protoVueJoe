<script setup lang="ts">
  import DropdownConfig from "@/Presentation/components/MealsSelection/DropdownConfig.vue";
  import Plant from "@/Presentation/icons/Plant.vue";
  import Egg from "@/Presentation/icons/Egg.vue";
  import Judaism from "@/Presentation/icons/Judaism.vue";
  import Islam from "@/Presentation/icons/Islam.vue";

  const props = defineProps<{
    value: any,
    setValue: (newValue: any) => void,
  }>();

  const red = '#BD0000FF';

  const switchDiet = (dietName: string) => {
    let newValue = props.value;
    newValue[dietName] = !newValue[dietName];
    props.setValue(newValue);
  }

  const diets = [
      [
        {
          name: 'vegan',
          icon: Plant,
        },{
          name: 'vegetarian',
          icon: Egg,
        }
      ],[
      {
        name: 'judaism',
        icon: Judaism,
      },{
        name: 'islam',
        icon: Islam,
      }
    ]
  ];
</script>

<template>
  <DropdownConfig>
    <template #button>
      <div style="display: flex; flex-direction: row; justify-content: space-around;">
        <Plant style="width: 50px;height: 20px;"/>
      </div>
      <div style="text-align: center;">
        diets
      </div>
    </template>
    <template #dropdown>
      <div :style="{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}">
        <div v-for="(dietLine, lineIndex) in diets" :key="lineIndex" :style="{display: 'flex', flexDirection: 'row', justifyContent: 'center'}">
          <div v-for="diet in dietLine" :key="diet.name" :style="{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px'}">
            <component :is="diet.icon" @click="()=>switchDiet(diet.name)" :style="{width: '50px', height: '20px', color: props.value[diet.name] ? red : ''}"/>
            <p>{{ diet.name }}</p>
          </div>
        </div>
      </div>
    </template>
  </DropdownConfig>
</template>