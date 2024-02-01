import type {Ingredient} from "@/Domain/Model/Ingredient";
import type {Product} from "@/Domain/Model/Product";

export interface ProductsApiInterface {
  fetchProducts(ingredients: Ingredient[]): Promise<Product[]>;
}