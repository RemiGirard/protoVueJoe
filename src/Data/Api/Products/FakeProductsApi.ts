import type {Product} from "@/Domain/Model/Product";
import type {ProductsApiInterface} from "@/Data/Api/Products/ProductsApiInterface";
import type {Ingredient} from "@/Domain/Model/Ingredient";

export class FakeProductsApi implements ProductsApiInterface {
  async fetchProducts(ingredients: Ingredient[]): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return ingredients.map((ingredient) => {
      return {
        name: ingredient.name,
        image: ingredient.image,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        price: Math.round(200*Math.random())/100,
      };
    });
  }
}