<script setup lang="ts">
import { onMounted, ref } from 'vue'

import ArrowLeft from "@/Presentation/icons/ArrowLeft.vue";
import NoDecButton from "@/Presentation/components/atoms/button/NoDecButton.vue";
import { useMealsStore } from '@/Stores/meals';

import type { Ingredient } from '@/Domain/Model/Ingredient';
import type { Meal } from '@/Domain/Model/Meal';
import { useShoppingCartStore } from '@/Stores/shoppingCart';
import type { Product } from '@/Domain/Model/Product';
import type {ProductsApiInterface} from '@/Data/Api/Products/ProductsApiInterface';
import MinusPlusButton from '@/Presentation/components/atoms/button/MinusPlusButton.vue'
import BorderedButton from '@/Presentation/components/atoms/button/BorderedButton.vue'
import FixedBigBottomButton from '@/Presentation/components/atoms/button/FixedBigBottomButton.vue'
import { ProductService } from '@/Domain/Service/ProductService';
import { MathService } from '@/Domain/Service/MathService';


const props = withDefaults(defineProps<{
    productsApi: ProductsApiInterface,
  }>(),{

})


const mealsStore = useMealsStore();

const shoppingCart = useShoppingCartStore();

const isLoading = ref(true);

const onLoad = async () => {
  if(!mealsStore.hasProducts()){
    const ingredients = mealsStore.getIngredients();
    const products = await props.productsApi.fetchProducts(ingredients);
    mealsStore.applyProducts(products);
    isLoading.value = false;
  }
};

// trigger onLoad when the component load
onMounted(onLoad);

</script>

<template>
  <div :style="{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}">
    <div :style="{flex: 1}">
      <NoDecButton :on-click="()=>{console.log('clicked');$router.go(-1)}">
        <ArrowLeft style="width: 50px;height: 25px;"/>
      </NoDecButton>
    </div>
    <div :style="{flex: 3, display: 'flex', justifyContent: 'center'}">
      <h1 style="{}">Groceries page</h1>
    </div>
    <div :style="{flex: 1}">

    </div>
  </div>
  <div>
    <div v-for="(meal, index) in mealsStore.meals" :key="index">
      <div :style="{display:'flex', flexDirection: 'row'}">
        <div>
          <img :src="meal.image" :style="{width: '150px', height: '150px', objectFit: 'cover', borderRadius: '30px'}">
        </div>
        <div :style="{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '15px'}">
          <div :style="{fontSize: '1.2em' , fontWeight: 'bold'}">{{ meal.name }}</div>
          <div :style="{color: 'grey'}">{{ meal.ingredients.length }} ingredient{{meal.ingredients.length>1?'s':''}}</div>
        </div>
        <div :style="{display: 'flex', justifyContent: 'center', alignItems: 'center'}">
          <div>{{meal.dishes}} dishe{{meal.dishes > 1 ? 's' : ''}}</div>
        </div>
      </div>
      <div v-for="(product, productIndex) in meal.products" :key="productIndex" :style="{display: 'flex', flexDirection: 'column', paddingLeft: '30px', marginTop: '10px'}">
        <div :style="{display: 'flex', flexDirection: 'row'}">
          <div :style="{display: 'flex', flexDirection: 'column'}">
            <img :src="product.image" :style="{width: '120px', height: '120px', objectFit: 'cover', borderRadius: '30px'}">
          </div>
          <div :style="{padding: '15px'}">
            <div :style="{fontSize: '1.2em' , fontWeight: 'bold'}">{{product.name}}</div>
            <div :style="{color: 'grey'}">{{product.quantity > 0 ? product.quantity : ''}} {{product.unit}}</div>
          </div>
        </div>
        <div :style="{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '5px'}">
          <div :style="{display: 'flex', flexDirection: 'row'}">
            <MinusPlusButton :value="Math.round((product.quantity)*100)/100" :setValue="(newValue: number)=>product.quantity=newValue" :step="ProductService.getStepFromQuantity(product.quantity)"/>
            <BorderedButton :style="{marginLeft: '15px'}">Changer</BorderedButton>
          </div>
          <div :style="{fontSize: '1.2em'}">{{Math.round(100*Math.random())/100}} €</div>
        </div>
      </div>
    </div>
  </div>
  <FixedBigBottomButton :onClick="()=>{$router.push({path: 'order'})}" :style="{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}">
    <div>
      Finish the order
    </div>
    <div>
      {{ MathService.round2(mealsStore.getTotal()) }} €
    </div>
  </FixedBigBottomButton>
</template>
