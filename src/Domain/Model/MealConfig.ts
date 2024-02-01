export interface MealConfig {
  mealsCount: number,
  people: {
    adults: number,
    children: number,
  },
  diet: {
    vegetarian: boolean,
    vegan: boolean,
    judaism: boolean,
    islam: boolean,
  },
  without: {
    peanut: boolean,
    egg: boolean,
  },
  equipments: {
    hoven: boolean,
    microwave: boolean,
    freezer: boolean,
  },
  maxIngredientsDisplayed: number,
}