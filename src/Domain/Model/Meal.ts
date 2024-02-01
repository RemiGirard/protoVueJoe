import type {Ingredient} from "@/Domain/Model/Ingredient";
import type { Product } from '@/Domain/Model/Product';
import { v4 as uuidv4 } from 'uuid';

export type Meal = {
  id: string, // uuid
  loading: false,
  name: string,
  time: number, // minutes
  url: string,
  image: string,
  ingredients: Ingredient[],
  dishes?: number,
  products?: Product[],
  diets: string[], // lower case
}

export type LoadingMeal = {
  id: string,
  loading: true,
}

export const getNewLoadingMeal = (): LoadingMeal => {
  return {
    id: uuidv4(),
    loading: true,
  }
}