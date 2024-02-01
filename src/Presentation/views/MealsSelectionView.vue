<script setup lang="ts">
import {reactive, ref, onMounted, watch} from "vue";
import * as router2 from 'vue-router';

import RecipeThumbmail from "@/Presentation/components/MealsSelection/RecipeThumbmail.vue";
import RecipePreview from "@/Presentation/components/MealsSelection/RecipePreview.vue";
import NumberSelect from "@/Presentation/components/atoms/NumberSelect.vue";
import MealConfigPeople from "@/Presentation/components/MealsSelection/MealConfigPeople.vue";
import MealConfigDiets from "@/Presentation/components/MealsSelection/MealConfigDiets.vue";
import MealConfigWithout from "@/Presentation/components/MealsSelection/MealConfigWithout.vue";
import MealConfigEquipments from "@/Presentation/components/MealsSelection/MealConfigEquipments.vue";
import NoDecButton from "@/Presentation/components/atoms/button/NoDecButton.vue";
import SelectWithIcon from "@/Presentation/components/atoms/SelectWithIcon.vue";
import type {Meal} from "@/Domain/Model/Meal";
import type {MealConfig} from "@/Domain/Model/MealConfig";
import type {RecipesApiInterface} from "@/Data/Api/Recipes/RecipesApiInterface";
import AttractiveButton from "@/Presentation/components/atoms/button/AttractiveButton.vue";
import FixedBigBottomButton from "@/Presentation/components/atoms/button/FixedBigBottomButton.vue";
import { useMealsStore } from '@/Stores/meals'
import type { ProductService } from '@/Domain/Service/ProductService'
import { ObjectUtil } from '@/Util/ObjectUtil'

const props = defineProps<{
  recipesApi: RecipesApiInterface,
}>();

const mealConfig = reactive<MealConfig>({
  mealsCount: 5,
  people: {
    adults: 2,
    children: 0,
  },
  diet: {
    vegetarian: true,
    vegan: false,
    judaism: false,
    islam: false,
  },
  without: {
    peanut: false,
    egg: false,
  },
  equipments: {
    hoven: true,
    microwave: true,
    freezer: true,
  },
  maxIngredientsDisplayed: 5,
});

const maxDishes = 6;

const mealsStore = useMealsStore();

const handleMealFetch = async () => {
  let fetchedMeals = await props.recipesApi.fetchRecipes(mealConfig);
  fetchedMeals = mealsStore.addDishToMealsFromPeople(fetchedMeals, mealConfig.people);
  mealsStore.setMeals(fetchedMeals);
};

const handleCompleteMealFetch = async () => {
  if(mealsStore.meals.length < mealConfig.mealsCount) {
    let fetchedMeals = await props.recipesApi.fetchRecipes(mealConfig);
    fetchedMeals = fetchedMeals.slice(0, mealConfig.mealsCount - mealsStore.meals.length);
    fetchedMeals = mealsStore.addDishToMealsFromPeople(fetchedMeals, mealConfig.people);
    mealsStore.addMeals(fetchedMeals);
  }
};

const handleAddAMeal = async () => {
  mealConfig.mealsCount++;
  mealsStore.addMealOnTop(null);
  let fetchedMeal = await fetchAMeal();
  mealsStore.replaceMeal(0, fetchedMeal);
};

const fetchAMeal = async (): Promise<Meal> => {
  let [fetchedMeal] = await props.recipesApi.fetchRecipes(mealConfig);
  [fetchedMeal] = mealsStore.addDishToMealsFromPeople([fetchedMeal], mealConfig.people);
  return fetchedMeal;
};

onMounted(() => {
  if(mealsStore.meals.length === 0) {
    handleMealFetch();
  }
});

watch(() => mealConfig.people, (newPeople) => {
  mealsStore.applyPeopleToDishes(newPeople);
});

watch(() => ({ ...mealConfig.diet }), (newDiets) => {
  mealsStore.filterOutDiets(ObjectUtil.getTrueKeys(newDiets));
  handleCompleteMealFetch();
});

watch(() => ({ ...mealConfig.without }), (newWithout) => {
  mealsStore.filterOutWithouts(ObjectUtil.getTrueKeys(newWithout));
  handleCompleteMealFetch();
});


const deleteMeal = (mealIndex: number) => {
  mealsStore.deleteMeal(mealIndex);
  mealConfig.mealsCount--;
};

const replaceMeal = async (mealIndex: number) => {
  mealsStore.loadMeal(mealIndex);
  const newMeal = await fetchAMeal();
  mealsStore.replaceMeal(mealIndex, newMeal);
};

const getMainIngredientsNames = (meal: Meal) => {
  return meal.ingredients
      .slice(0, mealConfig.maxIngredientsDisplayed)
      .map((c)=>c.name)
      .join(', ');
};

</script>

<template>
  <div :style="{display: 'flex', flexDirection: 'column'}">
    <div>
      Here
      <NumberSelect :value="mealConfig.mealsCount" :max="7" :setValue="(newValue: number)=>mealConfig.mealsCount=newValue" />
      recipes we selected for you
    </div>
    <div style="display: flex; flex-direction: row;">
      <MealConfigPeople :value="mealConfig.people" :set-value="(newValue: MealConfig['people'])=>mealConfig.people=newValue" />
      <MealConfigDiets :value="mealConfig.diet" :set-value="(newValue: MealConfig['diet'])=>mealConfig.diet=newValue" />
      <MealConfigWithout :value="mealConfig.without" :set-value="(newValue: MealConfig['without'])=>mealConfig.without=newValue" />
      <MealConfigEquipments :value="mealConfig.equipments" :set-value="(newValue: MealConfig['equipments'])=>mealConfig.equipments=newValue" />
    </div>
    <div>
      <div style="display: flex; flex-direction: row; justify-content: space-between;">
        <div>{{mealsStore.meals.length}} meals</div>
        <AttractiveButton :onClick="handleAddAMeal" :disabled="mealConfig.mealsCount >= maxDishes">+ Add a meal</AttractiveButton>
      </div>
      <RecipeThumbmail>
        <RecipePreview v-for="(meal, index) in mealsStore.meals" :key="index" :url="meal ? meal.url : ''">
          <img :src='meal ? meal.image : ""' style="width: 150px; height: 150px; object-fit: cover;border-radius: 30px;"/>
          <div style="display: flex; flex-direction: column; justify-content: space-between; width: 100%; padding: 5px">
            <div>
              <h4 style="font-weight: bold">{{meal ? meal.name : ''}}</h4>
              <div v-if="meal && meal.time > 0" style="color: grey">{{meal.time}} minutes</div>
              <div v-if="meal && meal.ingredients.length > 0" style="color: grey">{{meal ? getMainIngredientsNames(meal) : ''}}</div>
            </div>
            <div v-if="meal" style="display: flex; flex-direction: row;justify-content: space-between;">
              <NoDecButton :onClick="(e: Event)=>{replaceMeal(index);e.stopPropagation()}">
                Replace
              </NoDecButton>
              <div style="display: flex;flex-direction: row">
                <SelectWithIcon :value="meal.dishes" :setValue="(newValue: number)=>meal.dishes=newValue">
                  <option v-for="dishCount in maxDishes" :key="dishCount" :value="dishCount">{{dishCount}}</option>
                </SelectWithIcon>
                <NoDecButton :onClick="(e: Event)=>{deleteMeal(index);e.stopPropagation()}" >
                  Delete
                </NoDecButton>
              </div>
            </div>
          </div>
        </RecipePreview>
      </RecipeThumbmail>
    </div>
  </div>
  <FixedBigBottomButton :onClick="()=>{$router.push({path: 'groceries'})}">Continue</FixedBigBottomButton>
</template>
