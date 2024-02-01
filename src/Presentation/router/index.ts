import { createRouter, createWebHistory } from 'vue-router'
import MealsSelectionView from '@/Presentation/views/MealsSelectionView.vue'

import {EdamamRecipesApi} from "@/Data/Api/Recipes/Edamam/EdamamRecipesApi";
import { FakeProductsApi } from '@/Data/Api/Products/FakeProductsApi'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MealsSelection',
      component: MealsSelectionView,
      props: {
        recipesApi: new EdamamRecipesApi(),
      }
    },
    {
      path: '/groceries',
      name: 'groceries',
      component: () => import('@/Presentation/views/GroceriesView.vue'), // lazy load
      props: {
        productsApi: new FakeProductsApi(),
      }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/Presentation/views/OrderView.vue'),
    }
  ],
})

export default router
