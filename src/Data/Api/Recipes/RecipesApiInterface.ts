import type {Meal} from "@/Domain/Model/Meal";
import type {MealConfig} from "@/Domain/Model/MealConfig";

export interface RecipesApiInterface {
  fetchRecipes(mealConfig: MealConfig): Promise<Meal[]>;
}