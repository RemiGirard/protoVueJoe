import type {Ingredient} from "./Ingredient";

export type Recipe = {
  recipe: {
    uri: string;
    label: string;
    image: string;
    images: {
      THUMBNAIL: ImageInfo;
      SMALL: ImageInfo;
      REGULAR: ImageInfo;
      LARGE: ImageInfo;
    };
    source: string;
    url: string;
    shareAs: string;
    yield: number;
    dietLabels: string[];
    healthLabels: string[];
    cautions: string[];
    ingredientLines: string[];
    ingredients: Ingredient[];
    calories: number;
    glycemicIndex: number;
    inflammatoryIndex: number;
    totalCO2Emissions: number;
    co2EmissionsClass: "A+" | "A" | "B" | "C" | "D" | "E" | "F" | "G";
    totalWeight: number;
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    instructions: string[];
    tags: string[];
    externalId: string;
    totalNutrients: NutrientsInfo;
    totalDaily: NutrientsInfo;
    totalTime: number;
    digest: any; // Replace 'any' with the actual type for digest if available
  }
}
