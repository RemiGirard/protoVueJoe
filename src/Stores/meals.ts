import { defineStore } from 'pinia';
import type { LoadingMeal, Meal } from '@/Domain/Model/Meal'
import type { Ingredient } from '@/Domain/Model/Ingredient'
import type { Product } from '@/Domain/Model/Product'
import type { MealConfig } from '@/Domain/Model/MealConfig'

export const useMealsStore = defineStore('meals', {

  state: () => ({
    meals: [] as Array<Meal|LoadingMeal>,
  }),

  actions: {
    setMeals(meals: Meal[]) {
      this.meals = meals;
    },
    
    addMeal(meal: Meal | LoadingMeal) {
      this.meals.push(meal);
    },

    addMealOnTop(meal: Meal | LoadingMeal) {
      this.meals.unshift(meal);
    },

    getRealMeals(): Meal[] {
      return this.meals.filter((meal) => meal !== null) as Meal[];
    },

    addMeals(meals: Meal[]) {
      this.meals = [...this.meals, ...meals];
    },
    
    deleteMeal(mealIndex: number) {
      this.meals.splice(mealIndex, 1);
    },

    loadMeal(mealIndex: number) {
      this.meals[mealIndex] = null;
    },

    replaceMeal(mealIndex: number, meal: Meal) {
      this.meals[mealIndex] = meal;
    },

    getIngredients(): Ingredient[]{
      return this.getRealMeals().reduce((ingredients: Ingredient[], meal: Meal) => {
        return [...ingredients, ...meal.ingredients];
      }, []);
    },

    applyProducts(products: Product[]): void {
      const slicedProducts = products;
      this.getRealMeals().forEach((meal) => {
        meal.products = slicedProducts.splice(0, meal.ingredients.length);
      });
    },

    getTotal() {
      return this.getRealMeals().reduce((total, meal) => {
        return total + this.getTotalOfAMeal(meal);
        }, 0);
    },

    getTotalOfAMeal(meal: Meal): number {
      if(meal.products !== undefined){
        return meal.products.reduce((total, product) => {
          return total + product.price;
        }, 0);
      }

      return 0;
    },

    hasProducts(){
      return this.getRealMeals().some((meal) => meal.products !== undefined && length > 0);
    },

    applyPeopleToDishes(people: MealConfig['people']): void {
      this.meals = this.meals.map((meal) => {
        if(meal === null){return meal;}
        meal.dishes = people.adults + Math.ceil(people.children / 2);
        return meal;
      })
    },

    addDishToMealsFromPeople(meals: Meal[], people: MealConfig['people']): Meal[] {
      return meals.map((meal) => {
        meal.dishes = people.adults + Math.ceil(people.children / 2);
        return meal;
      });
    },

    filterOutDiets(diets: string[]) {
      this.meals = this.getRealMeals().filter((meal) => {
        return !(diets.some((diet) => !meal.diets.includes(diet)));
      });
    },

    filterOutWithouts(withouts: string[]) {
      this.meals = this.getRealMeals().filter((meal) => {
        return !(withouts.some((without) => {
          return meal
            .ingredients
            .map((ingredient) => ingredient.name)
            .includes(without)
          ;
        }));
      });
    },

  },
});