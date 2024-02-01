<script setup lang="ts">
import { fileNameFromPath } from '@/Util/FileNameUtil';
import shopList from '@/Data/Enum/ShopList.json';

const logosObject = import.meta.glob('@/Presentation/assets/shopLogo/*.png');

const logos = Object.entries(logosObject).map(([path, component]) => {
  const name = fileNameFromPath(path);
  return {name,component};
});

</script>

<template>
  <div :style="{display: 'flex', flexDirection: 'column'}">
    <div>Order</div>
    <div>
      <div v-for="shop in shopList" :key="shop.name" :style="{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}">
        <div :style="{display: 'flex', flexDirection: 'row', alignItems: 'center'}">
          <img :src="logos[shop.logo]" :style="{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '30px'}">
          <div :style="{paddingLeft: '10px'}">{{shop.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>