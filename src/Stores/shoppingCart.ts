import { defineStore } from 'pinia';
import type { Product } from '@/Domain/Model/Product'

export const useShoppingCartStore = defineStore('shoppingCart', {

  state: () => ({
    products: [] as Array<Product>,
  }),

  actions: {
    setProducts(meals: Product[]) {
      this.products = meals;
    },
    
    addProduct(product: Product) {
      this.products.push(product);
    },
    
    deleteProducts(productIndex: number) {
      this.products.splice(productIndex, 1);
    },
  },
});