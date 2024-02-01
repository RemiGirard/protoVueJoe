import SeaFood from '@/Data/Enum/SeaFood.json';

import type {Meal} from "@/Domain/Model/Meal";
import type {MealConfig} from "@/Domain/Model/MealConfig";
import type {RecipesApiInterface} from "@/Data/Api/Recipes/RecipesApiInterface";
import type {Ingredient} from "@/Domain/Model/Ingredient";

import type {Ingredient as EdamamIngredient} from "@/Data/Api/Recipes/Edamam/Model/Ingredient";
import type {Recipe as EdamamRecipe} from "@/Data/Api/Recipes/Edamam/Model/Recipe";

export class EdamamRecipesApi implements RecipesApiInterface {
  async fetchRecipes(mealConfig: MealConfig): Promise<Meal[]> {

    const ApiEntranceUrl = 'https://api.edamam.com/api/recipes/v2';
    const queryParams = new URLSearchParams([
      ['type', 'public'],
      ['app_id', import.meta.env.VITE_RECIPE_API_LOGIN],
      ['app_key', import.meta.env.VITE_RECIPE_API_PASS],
      ['random', 'true'],
      ['mealType', 'Dinner'],
      ['mealType', 'Lunch'],
      ['diet', 'balanced'],
      // ['dishType', 'Main Course'] // has to be added last at the end of url
    ]);

    type Rule = [string, string];

    const converter: {[key: string]: {[key: string]: Rule[]}} = {
      diet: {
        vegetarian: [['health', 'vegetarian']],
        vegan: [['health', 'vegan']],
        judaism: [
          ['excluded', 'pork'],
          ['excluded', 'bacon'],
          ['excluded', 'seafood'],
          ['excluded', 'milk'],
          ['excluded', 'pudding'],
          ['excluded', 'blood'],
          ['excluded', 'insect'],
          ...SeaFood.map((ingredient): Rule=>['excluded', ingredient]),
        ],
        islam: [['excluded', 'pork'], ['excluded', 'bacon'], ['health', 'alcohol-free']],
      }
    };

    // add diets
    Object.entries(mealConfig.diet)
      .filter(([,value]) => value)
      .forEach(([key]) => {
        if(key in converter.diet && converter.diet[key]){
          converter.diet[key].forEach((rule: Rule) => {
            queryParams.append(rule[0], rule[1]);
          });
        }
      })
    ;

    // add without
    Object.entries(mealConfig.without).filter(([,value]) => value).forEach(([key]) => queryParams.append('excluded', key));

    // equipments are not handled

    // queryParams.append('dishType', 'Main Course');
    const url = ApiEntranceUrl+'?'+queryParams.toString()+'&dishType=Main%20Course';

    return fetch(
      url,{
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'language': 'en',
        },
      }
    ).then(async (response) => {
      const {hits}: { hits: EdamamRecipe[] } = await response.json();

      const fetchedMeals: Meal[] = hits.map((edamamRecipe) => this.convertMeal(edamamRecipe, mealConfig));

      return fetchedMeals.slice(0, mealConfig.mealsCount);
    })
      .catch(() => {
        // todo: handle error
        console.log({error: 'error'});
        return [];
      })
      ;
  }

  convertMeal = (edamamRecipe: EdamamRecipe, mealConfig: MealConfig):Meal => {
    const recipe = edamamRecipe.recipe;

    return {
      name: recipe.label,
      time: Number(recipe.totalTime),
      url: recipe.url,
      image: recipe.images.SMALL.url,
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients
          .sort((a, b)=>(b.weight - a.weight))
          .map(this.convertIngredient)
        : []
      ,
      diets: [...new Set([
        ...recipe.healthLabels.map((label) => label.toLowerCase()),
        ...Object.entries(mealConfig.diet)
          .filter(([,value]) => value)
          .map(([item]) => item)
      ])],
    }
  }

  convertIngredient = (edamamIngredient: EdamamIngredient): Ingredient => {
    const roundedQuantity = Math.round(edamamIngredient.quantity*100)/100;

    return {
      name: edamamIngredient.food,
      quantity: roundedQuantity,
      unit: edamamIngredient.measure === '<unit>' ? '' : edamamIngredient.measure,
      image: edamamIngredient.image
    };
  }
}
